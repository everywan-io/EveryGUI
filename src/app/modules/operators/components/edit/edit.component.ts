import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {PhoneNumberComponent} from 'ngx-international-phone-number';

import {merge} from 'rxjs';

import {Operator, OperatorRoles} from '@models/operators.model';
import {CapitalizePipe} from '@everyup/pipes/strings/capitalize.pipe';
import {CustomValidators} from '@everyup/validators/custom.validators';
import {ButtonStates} from '@modules/shared/components/button/button.component';
import {OperatorsService} from '@modules/operators/operators.service';
import {NotificationsService} from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';

@Component({
    selector: 'app-operators-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @ViewChild('phone') phoneComponent: PhoneNumberComponent;

    readonly OperatorRoles = OperatorRoles;

    timestamp = Date.now();

    mode: 'edit' | 'create';
    form: FormGroup;
    formErrorMessage: string;

    imageURL: string;
    avatarFile: File;
    avatarDefault = '/assets/images/avatar_default.jpg';
    avatarChanged: boolean;

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private operators: OperatorsService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private title: TitleService) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'operators.edit.actions.create'
        };

        this.avatarChanged = false;
    }

    ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];


        this.imageURL = (this.mode === 'edit')
            ? this.route.snapshot.data['operator'].avatar
            : this.avatarDefault;

        this.imageURL = this.imageURL + '?t=' + this.timestamp;

        this.form = this.defineForm(this.mode === 'edit');

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `operators.edit.actions.${this.mode}`;

        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'edit'));

        merge(
            this.form.get('submitted').valueChanges,
            this.form.statusChanges
        ).subscribe(() => {
            if (this.mode === 'edit') {
                this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            } else {
                const submittedControl = this.form.get('submitted');
                const passwordCheck = this.form.get('password').valid && this.form.get('password').dirty;
                const passwordConfirmCheck = this.form.get('password-confirm').valid && this.form.get('password-confirm').dirty;

                this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;

                if (passwordCheck && passwordConfirmCheck && submittedControl.value && this.form.hasError('passwordsMismatch')) {
                    this.formErrorMessage = 'errors.validations.passwords.mismatch';
                } else {
                    this.formErrorMessage = '';
                }
            }
        });

        this.title.set(`operators.edit.title.${this.mode}`);
    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            this.form.updateValueAndValidity();
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        // Sending data to backend
        const operation = this.mode === 'edit' ? 'update' : 'create';
        const capitalizePipe = new CapitalizePipe();
        const payload = {
            avatar: this.avatarFile,
            name: capitalizePipe.transform(this.form.get('name').value, 'words'),
            surname: capitalizePipe.transform(this.form.get('surname').value, 'words'),
            email: this.form.get('email').value.toLowerCase(),
            password: this.form.get('password').value,
            role: this.form.get('role').value,
            id: this.form.get('id').value,

            ...this.parsePhoneNumberComponents()
        };

        this.mode === 'edit' ?
            delete payload.password :
            delete payload.id;

        if (!this.avatarChanged) {
            delete payload.avatar;
        }

        this.button.state = ButtonStates.LOADING;

        this.operators[operation](payload)
            .subscribe(
                (operator: Operator) => {
                    this.router.navigate(['/operators']);
                    this.notifications.success(
                        this.translator.instant(`operators.edit.notifications.${this.mode}.title`),
                        this.translator.instant(`operators.edit.notifications.${this.mode}.message`, operator)
                    );
                },
                (error: any) => {
                    this.notifications.error(
                        this.translator.instant(`operators.edit.notifications.${this.mode}.title`),
                        error.message
                    );
                }
            );
    }

    showPreview(event) {

        const file = (event.target as HTMLInputElement).files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            this.imageURL = reader.result as string;

            this.avatarFile = event.target.files[0];

            this.avatarChanged = true;
        };
    }


    private parsePhoneNumberComponents(): { 'phone_main': string; 'phone_country': string; } | null {
        if (!this.phoneComponent.selectedCountry) {
            return null;
        }

        const prefix: string = this.phoneComponent.selectedCountry.dialCode;
        const main: string = this.form.get('phone').value;

        if (main && main.substr(prefix.length + 1).length > 0) {
            return {
                phone_country: `+${this.phoneComponent.selectedCountry.dialCode}`,
                phone_main:  main.substr(prefix.length + 1).trim()
            };
        } else {
            return null;
        }
    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(edit: boolean): FormGroup {

        const operator: Operator = this.route.snapshot.data['operator'];
        const initialFormValues = {
            id: edit ? operator.id : null,
            name: edit ? operator.name : null,
            surname: edit ? operator.surname : null,
            role: edit ? operator.role : null,
            phone: edit ? operator.phone.readable : null,
            email: edit ? operator.email : null,
        };

        const formGroup = new FormGroup({
                'submitted': new FormControl(false, []),
                'id': new FormControl(initialFormValues.id, []),
                'phone': new FormControl(initialFormValues.phone, []),
                'avatar': new FormControl(null, []),
                'name': new FormControl(initialFormValues.name, [Validators.required]),
                'surname': new FormControl(initialFormValues.surname, [Validators.required]),
                'role': new FormControl(initialFormValues.role, [Validators.required]),
                'email': new FormControl(initialFormValues.email, [Validators.required, CustomValidators.email]),
                'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
                'password-confirm': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            }, {
                validators: [CustomValidators.passwordsMatch]
            });

        if (edit) {
            formGroup.get('password').setValidators([]);
            formGroup.get('password-confirm').setValidators([]);
            formGroup.setValidators([]);
            formGroup.get('password').updateValueAndValidity();
            formGroup.get('password-confirm').updateValueAndValidity();
        }

        return formGroup;
    }
}
