import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { DatepickerConfig, DatepickerItalianFormatter } from '@configs/datepicker.config';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { TitleService } from '@services/title.service';
import { DatesService } from '@services/dates.service';
import * as Moment from 'moment';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { Inquiry } from '@models/inquiries.model';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { NgProgress } from '@ngx-progressbar/core';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { UserGroup } from '@models/userGroups.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
    selector: 'app-are-you-fine-filters',
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

    button: {
        state: ButtonStates,
        title: string;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    queryFromDate;
    queryToDate;

    correctGroup: boolean;

    form: FormGroup;

    modalGroupReference;

    groupFormatter = (group: {name: string}) => group.name;

    constructor(private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private title: TitleService,
                private modal: NgbModal,
                private translator: TranslateService,
                private areYouFineService: AreyoufineService,
                private notifications: NotificationsService,
                private progress: NgProgress) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();

        this.filters = {
            subject: new Subject<FilterStreamInterface>(),
            data: {},
            visible: !device.isMobile()
        };

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'areYouFine.send.actions.send'
        };

        this.loading = {
            term: false
        };

        this.correctGroup = false;

    }

    searchGroup = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap( (term) => {
                if (this.correctGroup) {
                    this.button.state = ButtonStates.DISABLED;
                    this.correctGroup = false;
                }
                if (term.length === 0) {
                    return [];
                } else if (term.length > 0 && term.length < 2) {
                    return [];
                } else {
                    return this.areYouFineService.fetchGroups({term: term})
                        .pipe(
                            map((groups: UserGroup[]) => groups)
                        );
                }
            })
        )

    ngOnInit() {

        this.form = new FormGroup({
            submitted: new FormControl(false, []),
            group: new FormControl({value: {name: null}}, [Validators.required]),
        });

        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);

                if (params['from_date']) {
                    this.queryFromDate = DatesService.fromMomentToDateStruct(Moment(params['from_date']));
                }

                if (params['to_date']) {
                    this.queryToDate = DatesService.fromMomentToDateStruct(Moment(params['to_date']));
                }

            });

        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {
                if (filter.key.endsWith('date')) {
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

                this.title.set('areYouFine.list.title');
            });

        this.form.statusChanges
            .subscribe(() => {
                this.button.state = (this.form.valid && this.correctGroup) ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

    }

    onDateInputFieldKeyPressed(key: string, value: string) {
        if (value.length === 0 || value.length !== 8 || !Moment.utc(value, 'DD/MM/YYYY').isValid()) {
            this.filters.subject.next({key, value: null});
        }
    }

    onCreate() {
        let sendIsInProgress = false;

        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('areYouFine.send.modals.send.title');

        modalConfirmReference.componentInstance.message = this.translator.instant('areYouFine.send.modals.send.message', { group: this.form.get('group').value.name });

        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('areYouFine.send.modals.send.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('areYouFine.send.modals.send.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    if (sendIsInProgress) {
                        return;
                    }

                    sendIsInProgress = true;

                    const payload = {
                        type: 'areyoufine',
                        recipients_group: this.form.get('group').value.id,
                    };

                    this.areYouFineService.create(payload)
                        .subscribe((inquiry: Inquiry) => {
                            modalConfirmReference.close(true);

                            this.modalGroupReference.close(true);

                            this.router.navigate(['/areyoufine', inquiry.id, 'feeds']);
                            this.notifications.success(
                                this.translator.instant('areYouFine.send.notifications.title'),
                                this.translator.instant('areYouFine.send.notifications.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.modalGroupReference.close(true);


                            this.router.navigate(['/areyoufine']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('areYouFine.send.notifications.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

    open(content) {
        this.modalGroupReference = this.modal.open(content, { centered: true });
    }

}
