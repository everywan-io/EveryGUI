import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { ResponsiveState } from 'ngx-responsive';
import { TitleService } from '@services/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { InquiryFeedStatus } from '@models/inquiryFeeds.model';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
  selector: 'app-areyoufine-feeds-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FeedsFiltersComponent implements OnInit {

    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    queryStatus;
    queryResponse;

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

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private title: TitleService,
                private modal: NgbModal,
                private translator: TranslateService,
                private areyoufineService: AreyoufineService,
                private notifications: NotificationsService) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();
        this.filterOptionsDescriptors = {
            status: [
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.status.sent'),
                    value: InquiryFeedStatus.sent
                },
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.status.delivered'),
                    value: InquiryFeedStatus.delivered
                },
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.status.readed'),
                    value: InquiryFeedStatus.readed
                },
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.status.withResponse'),
                    value: InquiryFeedStatus.withResponse
                }
            ],
            response: [
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.response.im_fine'),
                    value: 'im_fine'
                },
                {
                    title: this.translator.instant('areYouFine.feeds.filters.fields.response.need_help'),
                    value: 'need_help'
                }
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

        this.button = {
            state: ButtonStates.ACTIVE,
            title: 'areYouFine.feeds.actions.reSend.title'
        };

    }

    ngOnInit() {
        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);
                params.status ? this.queryStatus = params.status : this.queryStatus = '';
                params.response ? this.queryResponse = params.response : this.queryResponse = '';
            });

        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {

                this.filters.data[filter.key] = filter.value;

                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: this.filters.data
                });

                this.title.set(this.translator.instant('areYouFine.feeds.title'));
            });
    }

    onSelectChange(filterKey, value) {
        this.filters.subject.next({ key: filterKey, value: value });
    }

    onResend(status) {

        const inquiryId = this.route.snapshot.paramMap.get('id');

        if (this.button.state !== ButtonStates.ACTIVE) {
            return;
        }

        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('areYouFine.feeds.modals.reSend.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('areYouFine.feeds.modals.reSend.message.' + status);
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('areYouFine.feeds.modals.reSend.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('areYouFine.feeds.modals.reSend.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    modalConfirmReference.componentInstance.startLoading();

                    const paylod = {
                        id: inquiryId,
                        status: status
                    };

                    this.areyoufineService.reSend(paylod)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/areyoufine', inquiryId, 'feeds']);

                            this.title.set(this.translator.instant('areYouFine.feeds.title'));

                            this.notifications.success(
                                this.translator.instant('areYouFine.feeds.notifications.title'),
                                this.translator.instant('areYouFine.feeds.notifications.message')
                            );

                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/areyoufine', inquiryId, 'feeds']);

                            this.title.set(this.translator.instant('areYouFine.feeds.title'));

                            this.notifications.error(
                                this.translator.instant('areYouFine.feeds.notifications.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
