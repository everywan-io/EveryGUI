import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import {ResponsiveState} from 'ngx-responsive';
import * as Moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '@modules/users/users.service';
import { UserGroup } from '@models/userGroups.model';
import { Gender, UserAccount } from '@models/users.model';
import {DatesService} from '@services/dates.service';
import {PaginatorService} from '@modules/shared/services/paginator.service';
import {DatepickerConfig, DatepickerItalianFormatter} from '@configs/datepicker.config';
import {TitleService} from '@services/title.service';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
    selector: 'app-users-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    providers: [
        PaginatorService,
        DatepickerConfig,
        {
            provide: NgbDateParserFormatter,
            useClass: DatepickerItalianFormatter
        }
    ]
})
export class FiltersComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    filters: {
        subject: Subject<FilterStreamInterface>,
        data: { [key: string]: string }
        visible: boolean;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    queryTerm: string;
    queryGender: string;
    queryAccount: string;
    queryFromDate;
    queryToDate;
    queryGroup;

    groupFormatter = (group: {name: string}) => group.name;
    constructor(private device: ResponsiveState,
                private translator: TranslateService,
                private route: ActivatedRoute,
                private router: Router,
                private title: TitleService,
                private userService: UsersService) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();

        this.filterOptionsDescriptors = {
            gender: [
                {title: this.translator.instant('commons.gender.female'), value: Gender.female},
                {title: this.translator.instant('commons.gender.male'), value: Gender.male}
            ],
            status: [
                {title: this.translator.instant('users.list.filters.fields.account.pending'), value: UserAccount.pending},
                {title: this.translator.instant('users.list.filters.fields.account.active'), value: UserAccount.active}
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

    }

    searchGroup = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap( (term) => {
                if (term.length === 0) {
                    this.filters.subject.next({ key: 'group', value: '' });
                    return [];
                } else if (term.length > 0 && term.length < 2) {
                    return [];
                } else {
                    return this.userService.fetchGroups({term: term})
                        .pipe(
                            map((groups: UserGroup[]) => groups)
                        );
                }
            })
        )

    ngOnInit() {

        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);
                this.queryTerm = params.term;

                params.gender ? this.queryGender = params.gender : this.queryGender = '';

                params.status ? this.queryAccount = params.status : this.queryAccount = '';

                if (params.from_date_dob) {
                    this.queryFromDate = DatesService.fromMomentToDateStruct(Moment(params.from_date_dob));
                }

                if (params.to_date_dob) {
                    this.queryToDate = DatesService.fromMomentToDateStruct(Moment(params.to_date_dob));
                }

                if (params.group) {
                   this.userService.getGroup(params.group)
                       .subscribe( (group: UserGroup) => this.queryGroup = group);
                } else {
                    this.queryGroup = '';
                }

                this.title.set('users.list.title');

            });

        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {
                if (filter.key.endsWith('date_dob')) {
                    this.filters.data[filter.key] = filter.value
                        ? DatesService.fromDateStructToMoment(filter.value).toISOString()
                        : undefined;
                } else {
                    this.filters.data[filter.key] = filter.value;
                }

                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: this.filters.data
                });
                this.title.set('users.list.title');
            });

    }

    onDateInputFieldKeyPressed(key: string, value: string) {
        if (value.length === 0 || value.length !== 8 || !Moment.utc(value, 'DD/MM/YYYY').isValid()) {
            this.filters.subject.next({key, value: null});
        }
    }
}
