import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
    ;
import { PhoneNumberComponent } from 'ngx-international-phone-number';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { Gender, User } from '@models/users.model';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '@modules/users/users.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';
import { DatesService } from '@services/dates.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-users-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @ViewChild('phoneComponent') phoneComponent: PhoneNumberComponent;

    user: User;

    timestamp = Date.now();

    form: FormGroup;

    imageURL: string;
    avatarDefault = '/assets/images/avatar_default.jpg';

    button: {
        state: ButtonStates,
        title: string;
    };

    genderValues = [
        { title: this.translator.instant('commons.gender.female'), value: Gender.female },
        { title: this.translator.instant('commons.gender.male'), value: Gender.male}];

    residentValues = [
        { title: this.translator.instant('users.details.fields.resident.responses.yes'), value: true },
        { title: this.translator.instant('users.details.fields.resident.responses.no'), value: false }];

    constructor(private route: ActivatedRoute,
                private translator: TranslateService,
                private userService: UsersService,
                private router: Router,
                private notifications: NotificationsService,
                private title: TitleService) {

        this.button = {
            state: ButtonStates.ACTIVE,
            title: 'users.details.actions.change'
        };

    }

    set phone(value: string) {
        this.form.get('phone_main').setValue(value);
    }

    get phone() {
        return this.form.get('phone_main').value;
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
        this.imageURL = this.avatarDefault + '?t=' + this.timestamp;
        this.form = this.defineForm();
        this.title.set('users.details.title');
    }

    defineForm(): FormGroup {
        let newDate;
        const initialFormValues = {
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            gender: this.user.gender,
            fiscalCode: this.user.fiscalCode,
            birthplace: this.user.birthplace,
            resident: this.user.resident,
            residentialAddress: this.user.residentialAddress,
            phoneMain: this.user.phone.formatted,
            info: this.user.info,
            emergencyContacts: this.user.emergencyContacts
        };

        newDate = DatesService.fromMomentToDateStruct(Moment(this.user.dob));

        const formGroup = new FormGroup({
            name: new FormControl({value: initialFormValues.name, disabled: true}),
            surname: new FormControl({value: initialFormValues.surname, disabled: true}),
            avatar: new FormControl({value: null, disabled: true}, []),
            email: new FormControl({value: initialFormValues.email, disabled: true}),
            gender: new FormControl({value: initialFormValues.gender, disabled: true}),
            dob: new FormControl({value: newDate, disabled: true}, []),
            birthplace: new FormControl({value: initialFormValues.birthplace, disabled: true}),
            fiscal_code: new FormControl({value: initialFormValues.fiscalCode, disabled: true}),
            resident: new FormControl({value: initialFormValues.resident, disabled: true}),
            residential_address: new FormControl({value: initialFormValues.residentialAddress, disabled: true}),
            info: new FormControl({value: initialFormValues.info, disabled: true}),
            emergency_contacts: new FormControl({value: initialFormValues.emergencyContacts, disabled: true}),
            phone_main: new FormControl({value: initialFormValues.phoneMain, disabled: true})
        });

        return formGroup;
    }

}
