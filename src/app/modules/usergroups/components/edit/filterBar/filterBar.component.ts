import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as Moment from 'moment';
import { Gender } from '@models/users.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { TranslateService } from '@ngx-translate/core';
import { DatesService } from '@services/dates.service';
import { DatepickerConfig, DatepickerItalianFormatter } from '@configs/datepicker.config';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { NgProgress } from '@ngx-progressbar/core';
import { UsergroupsService } from '@modules/usergroups/usergroups.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { UserGroup } from '@models/userGroups.model';


interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
  selector: 'app-user-groups-filterbar',
  templateUrl: './filterBar.component.html',
  styleUrls: ['./filterBar.component.scss'],
    providers: [
        DatepickerConfig,
        {
            provide: NgbDateParserFormatter,
            useClass: DatepickerItalianFormatter
        }
    ]
})
export class FilterBarComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string | boolean }>;

    filters: {
        subject: Subject<FilterStreamInterface>,
        data: { [key: string]: string | boolean }
        visible: boolean;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    errors: { [key: string]: string | boolean };

    mode: 'edit' | 'create';
    form: FormGroup;

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor( private device: ResponsiveState,
                 private translator: TranslateService,
                 private progress: NgProgress,
                 private userGroupsService: UsergroupsService,
                 private router: Router,
                 private route: ActivatedRoute,
                 private notifications: NotificationsService) {
        this.filtersChange = new EventEmitter<{ [key: string]: string | boolean }>();

        this.filterOptionsDescriptors = {
            gender: [
                { title: this.translator.instant('commons.gender.female'), value: Gender.female },
                { title: this.translator.instant('commons.gender.male'), value: Gender.male}
            ],
            resident: [
                { title: this.translator.instant('userGroups.create.filterBar.fields.filters.resident.responses.yes'), value: true },
                { title: this.translator.instant('userGroups.create.filterBar.fields.filters.resident.responses.no'), value: false}
            ]
        };

        this.filters = {
            subject: new Subject<FilterStreamInterface>(),
            data: {},
            visible: !device.isMobile()
        };

        this.loading = {
              term: false
        };

        this.errors = {
            groupName: null,
            groupDescription: null
        };

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'userGroup.create.action.create'
        };
    }


    ngOnInit() {
        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {
                if (filter.key.endsWith('date_dob')) {
                    this.filters.data[filter.key] = filter.value
                        ? DatesService.fromDateStructToMoment(filter.value).toISOString()
                        : undefined;
                } else if (filter.key === 'resident') {
                    this.filters.data[filter.key] = JSON.parse(filter.value);
                } else {
                    this.filters.data[filter.key] = filter.value;
                }
                this.filtersChange.emit(this.filters.data);
            });


        this.mode = this.route.snapshot.data['mode'];
        this.form = this.defineForm(this.mode === 'edit');


        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `userGroups.edit.actions.${this.mode}`;

        this.route.data
            .subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'edit'));

        this.form.statusChanges
            .subscribe(() => {
                this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });
    }

    onDateInputFieldKeyPressed(key: string, value: string) {
        if (value.length === 0 || value.length !== 8 || !Moment.utc(value, 'DD/MM/YYYY').isValid()) {
            this.filters.subject.next({ key, value: null });
        }
    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(edit: boolean): FormGroup {
        const group: UserGroup = this.route.snapshot.data['group'];

        const initialFormValue = {
            id: edit ? group.id : null,
            groupName: edit ? group.name : null,
            groupDescription: edit ? group.description : null,
            filters: {
                term: edit ? group.filters.term : null,
                gender: edit ? group.filters.gender : '',
                from_date_dob: edit ? DatesService.fromMomentToDateStruct(Moment(group.filters.fromDateDob || null )) : null,
                to_date_dob: edit ? DatesService.fromMomentToDateStruct(Moment(group.filters.toDateDob || null )) : null,
                platform_name: edit ? group.filters.platformName : null,
                resident: edit ? group.filters.resident : ''
            }
        };

        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'id': new FormControl(initialFormValue.id, []),
            'groupName': new FormControl(initialFormValue.groupName, [Validators.required]),
            'groupDescription': new FormControl(initialFormValue.groupDescription, [Validators.required]),
            'filters': new FormGroup({
                'term': new FormControl(initialFormValue.filters.term, []),
                'gender': new FormControl(initialFormValue.filters.gender ? initialFormValue.filters.gender : '', []),
                'from_date_dob': new FormControl(initialFormValue.filters.from_date_dob, []),
                'to_date_dob': new FormControl(initialFormValue.filters.to_date_dob, []),
                'platform_name': new FormControl(initialFormValue.filters.platform_name, []),
                'resident': new FormControl(initialFormValue.filters.resident.toString() ? initialFormValue.filters.resident : '', [])
            })
        });

        if (edit) {
            const initialFilters = {
                term: group.filters.term,
                gender: group.filters.gender ? group.filters.gender : '',
                from_date_dob: group.filters.fromDateDob,
                to_date_dob: group.filters.toDateDob,
                platform_name: group.filters.platformName,
                resident: group.filters.resident.toString() ? group.filters.resident : ''
            };

            this.filtersChange.emit(initialFilters);
        }

        return formGroup;
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

        const operation = this.mode === 'edit' ? 'update' : 'create';

        Object.keys(this.form.value.filters).forEach(
            (key) => (this.form.value.filters[key] == null) && delete this.form.value.filters[key]);

        const payload = {
            id: this.form.get('id').value,
            name: this.form.get('groupName').value,
            description: this.form.get('groupDescription').value,
            filters: this.form.value.filters
        };

        if (this.mode === 'create') {
            delete payload.id;
        }

        if (payload.filters.gender !== undefined && payload.filters.gender.length < 1) {
            delete payload.filters.gender;
        }

        if (payload.filters.from_date_dob) {
            payload.filters.from_date_dob = DatesService.fromDateStructToMoment(payload.filters.from_date_dob).toISOString();
        }

        if (payload.filters.to_date_dob) {
            payload.filters.to_date_dob = DatesService.fromDateStructToMoment(payload.filters.to_date_dob).toISOString();

        }

        if (payload.filters.resident !== undefined && payload.filters.resident === '') {
            delete payload.filters.resident;
        } else {
            payload.filters.resident = (payload.filters.resident === 'true');
        }

        this.button.state = ButtonStates.LOADING;

        this.userGroupsService[operation](payload)
            .subscribe(
                (group: UserGroup) => {
                    this.router.navigate(['/groups']);
                    this.notifications.success(
                        this.translator.instant(`userGroups.edit.notifications.${this.mode}.title`),
                        this.translator.instant(`userGroups.edit.notifications.${this.mode}.message`, group.name)
                    );
                },
                (error: any) => {
                    this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
                    this.notifications.error(

                        this.translator.instant(`userGroups.edit.notifications.${this.mode}.title`),
                        error.message
                    );
                }
            );
    }

}
