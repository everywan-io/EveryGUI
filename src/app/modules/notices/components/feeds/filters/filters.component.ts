import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResponsiveState } from 'ngx-responsive';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TitleService } from '@services/title.service';
import { NoticeStatus } from '@models/noticeFeeds.model';
import { TranslateService } from '@ngx-translate/core';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticesService } from '@modules/notices/notices.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { Notice } from '@models/notices.model';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
  selector: 'app-notices-feeds-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FeedsFiltersComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    queryStatus;

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
                private noticesService: NoticesService,
                private notifications: NotificationsService) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();
        this.filterOptionsDescriptors = {
            status: [
                {title: this.translator.instant('notices.feeds.filters.fields.status.sent'), value: NoticeStatus.sent},
                {title: this.translator.instant('notices.feeds.filters.fields.status.delivered'), value: NoticeStatus.delivered},
                {title: this.translator.instant('notices.feeds.filters.fields.status.readed'), value: NoticeStatus.readed}
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
            title: 'notices.feeds.actions.reSend.title'
        };
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);
                params.status ? this.queryStatus = params.status : this.queryStatus = '';
            });

        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {

                const notice: Notice = this.route.snapshot.data['notice'];

                this.filters.data[filter.key] = filter.value;

                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: this.filters.data
                });

                this.title.set(`${this.translator.instant('notices.feeds.title')}: ${notice.title}`);
            });

    }

    onSelectChange(filterKey, value) {
        this.filters.subject.next({ key: filterKey, value: value });
    }

    onResend(status) {

        if (this.button.state !== ButtonStates.ACTIVE) {
            return;
        }

        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('notices.feeds.modals.reSend.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('notices.feeds.modals.reSend.message.' + status);
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('notices.feeds.modals.reSend.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('notices.feeds.modals.reSend.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    modalConfirmReference.componentInstance.startLoading();

                    const paylod = {
                        id: this.route.snapshot.data['notice'].id,
                        status: status
                    };

                    this.noticesService.reSend(paylod)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/notices', this.route.snapshot.data['notice'].id, 'feeds']);

                            this.title.set(`${this.translator.instant('notices.feeds.title')}: ${this.route.snapshot.data['notice'].title}`);

                            this.notifications.success(
                                this.translator.instant('notices.feeds.notifications.title'),
                                this.translator.instant('notices.feeds.notifications.message')
                            );

                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/notices', this.route.snapshot.data['notice'].id, 'feeds']);

                            this.title.set(`${this.translator.instant('notices.feeds.title')}: ${this.route.snapshot.data['notice'].title}`);

                            this.notifications.error(
                                this.translator.instant('notices.edit.notifications.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
