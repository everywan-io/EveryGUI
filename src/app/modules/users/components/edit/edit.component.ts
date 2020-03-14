import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { Gender, User } from '@models/users.model';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from '@everyup/validators/custom.validators';
import { DatepickerConfig, DatepickerItalianFormatter } from '@configs/datepicker.config';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { UsersService } from '@modules/users/users.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { DatesService } from '@services/dates.service';
import { TitleService } from '@services/title.service';

import CodiceFiscale from 'codice-fiscale-js';
import { PhoneNumberComponent } from 'ngx-international-phone-number';


@Component({
    selector: 'app-users-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [
        DatepickerConfig,
        {
            provide: NgbDateParserFormatter,
            useClass: DatepickerItalianFormatter
        }
    ]
})
export class EditComponent implements OnInit {
    @ViewChild('phoneComponent') phoneComponent: PhoneNumberComponent;

    timestamp = Date.now();

    form: FormGroup;
    mode: 'edit' | 'create';

    imageURL: string;
    avatarFile: File;
    avatarDefault = '/assets/images/avatar_default.jpg';
    avatarChanged: boolean;

    button: {
        state: ButtonStates,
        title: string;
    };

    genderValues = [
        { title: this.translator.instant('commons.gender.female'), value: Gender.female },
        { title: this.translator.instant('commons.gender.male'), value: Gender.male}];

    residentValues = [
        { title: this.translator.instant('users.edit.fields.resident.responses.yes'), value: true },
        { title: this.translator.instant('users.edit.fields.resident.responses.no'), value: false }];

    constructor(private route: ActivatedRoute,
                private translator: TranslateService,
                private userService: UsersService,
                private router: Router,
                private notifications: NotificationsService,
                private title: TitleService,
                private renderer: Renderer2) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'users.edit.actions.create'
        };

        this.avatarChanged = false;

    }

    set phone(value: string) {
        this.form.get('phone_main').setValue(value);
    }

    get phone() {
        return this.form.get('phone_main').value;
    }

    ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];

        this.imageURL = (this.mode === 'edit')
            ? this.route.snapshot.data['user'].avatar
            : this.avatarDefault;

        this.imageURL = this.imageURL + '?t=' + this.timestamp;

        this.form = this.defineForm(this.mode === 'edit');

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `users.edit.actions.${this.mode}`;

        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'edit'));

        this.form.statusChanges.subscribe(() => this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED);

        this.title.set(`users.edit.title.${this.mode}`);

    }


    /* tslint:disable object-literal-key-quotes */
    defineForm(edit: boolean): FormGroup {
        let newDate;
        const user: User = this.route.snapshot.data['user'];
        const initialFormValues = {
            name: edit ? user.name : null,
            surname: edit ? user.surname : null,
            email: edit ? user.email : null,
            gender: edit ? user.gender : null,
            fiscalCode: edit ? user.fiscalCode : null,
            birthplace: edit ? user.birthplace : null,
            resident: edit ? user.resident : null,
            residentialAddress: edit ? user.residentialAddress : null,
            phoneMain: edit ? user.phone.formatted : null,
            info: edit ? user.info : null,
            emergencyContacts: edit ? user.emergencyContacts : null
        };

        console.log(initialFormValues);

        if (edit) {
            newDate = DatesService.fromMomentToDateStruct(Moment(user.dob));
        }

        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'name': new FormControl(initialFormValues.name, [Validators.required]),
            'surname': new FormControl(initialFormValues.surname, [Validators.required]),
            'avatar': new FormControl(null, []),
            'email': new FormControl(initialFormValues.email, [Validators.required, CustomValidators.email]),
            'gender': new FormControl(initialFormValues.gender, [Validators.required]),
            'dob': new FormControl(newDate, []),
            'birthplace': new FormControl(initialFormValues.birthplace, [Validators.required]),
            'fiscal_code': new FormControl(initialFormValues.fiscalCode, [this.fiscalcodeValidator]),
            'resident': new FormControl(initialFormValues.resident, [Validators.required]),
            'residential_address': new FormControl(initialFormValues.residentialAddress, [Validators.required]),
            'info': new FormControl(initialFormValues.info, []),
            'emergency_contacts': new FormControl(initialFormValues.emergencyContacts, []),
            'phone_main': new FormControl(initialFormValues.phoneMain, [Validators.required, CustomValidators.phone])
        });

        return formGroup;
    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            if (field === 'phone_main') {
                this.form.get(field).markAsDirty();

                this.renderer.removeClass(this.phoneComponent.phoneComponent.nativeElement, 'ng-untouched');
                this.renderer.addClass(this.phoneComponent.phoneComponent.nativeElement, 'ng-touched');
                this.renderer.addClass(this.phoneComponent.phoneComponent.nativeElement, 'ng-dirty');
            } else {
                this.form.get(field).markAsDirty();
                this.form.get(field).markAsTouched();
                this.form.get(field).updateValueAndValidity();
            }
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        const capitalizePipe = new CapitalizePipe();

        const payload = {
            ...this.form.value,
            ...this.parsePhoneNumberComponents(),
            dob: DatesService.fromDateStructToMoment(this.form.get('dob').value),
            id: this.route.snapshot.data['user'].id,
        };

        this.avatarChanged
            ? payload.avatar = this.avatarFile
            : delete payload.avatar;

        // Capitalizing values
        payload.name = capitalizePipe.transform(payload.name);
        payload.surname = capitalizePipe.transform(payload.surname);
        payload.fiscal_code = capitalizePipe.transform(payload.fiscal_code, 'all');

        this.button.state = ButtonStates.LOADING;

        this.userService.update(payload)
            .subscribe(
                (user: User) => {
                    this.router.navigate(['/users']);
                    this.notifications.success(
                        this.translator.instant(`users.edit.notifications.${this.mode}.title`),
                        this.translator.instant(`users.edit.notifications.${this.mode}.message`, user)
                    );
                },
                (error: any) => {
                    this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
                    this.notifications.error(
                        this.translator.instant(`users.edit.notifications.${this.mode}.title`),
                        error.message
                    );
                });

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

    onFiscalCodeKeyInput(input: string) {
        try {
            const cf = new CodiceFiscale(input.toUpperCase());

            if (cf.isValid()) {
                let place = cf.birthplace.nome.toLowerCase();

                place = `${place.charAt(0).toUpperCase()}${place.substr(1)}`;

                this.form.get('gender').setValue(cf.gender.toLowerCase());
                this.form.get('birth_place').setValue(place);
                this.form.get('dob').setValue({
                    year: cf.year,
                    month: cf.month,
                    day: cf.day
                });

                this.form.updateValueAndValidity();
            }
        } catch (e) {

        }
    }

    onFieldChange() {
        const requiredFields: string[] = ['name', 'surname', 'gender', 'dob', 'birthplace', 'resident', 'residential_address'];

        if (!requiredFields.every((key: string) => this.form.get(key).valid)) {
            return;
        }

        try {
            const date: NgbDate = this.form.get('dob').value;
            const payloadCf = {
                name: this.form.get('name').value.toString(),
                surname: this.form.get('surname').value.toString(),
                gender: this.form.get('gender').value.toString(),
                birthplace: this.form.get('birthplace').value.toString(),
                resident: this.form.get('resident').value.toString(),
                residential_address: this.form.get('residential_address').value.toString(),
                year: date.year,
                month: date.month,
                day: date.day
            };

            const cf = new CodiceFiscale(payloadCf);

            this.form.get('fiscal_code').setValue(cf.toString());
            this.form.updateValueAndValidity();
        } catch (e) {

        }
    }

    private fiscalcodeValidator(control: FormControl) {
        if (control.value && control.value.length === 16) {
            try {
                const cf = new CodiceFiscale(control.value.toUpperCase());

                if (cf.isValid()) {
                    return null;
                }
            } catch (e) {

            }

        }

        return {'invalid': true};
    }

    private parsePhoneNumberComponents(): { 'phone_main': string; 'phone_country': string; } | null {
        if (!this.phoneComponent.selectedCountry) {
            return null;
        }

        const prefix: string = this.phoneComponent.selectedCountry.dialCode;
        const main: string = this.form.get('phone_main').value;

        if (main && main.substr(prefix.length + 1).length > 0) {
            return {
                'phone_country': `+${this.phoneComponent.selectedCountry.dialCode}`,
                'phone_main':  main.substr(prefix.length + 1).trim()
            };
        } else {
            return null;
        }
    }

}
