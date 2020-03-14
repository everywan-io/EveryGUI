import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { NoticeFeed } from '@models/noticeFeeds.model';
import { TitleService } from '@services/title.service';
import { ResponsiveState } from 'ngx-responsive';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { NoticesService } from '@modules/notices/notices.service';
import { Subscription, timer } from 'rxjs';
import { Notice } from '@models/notices.model';
import { NoticeFeedsStats } from '@models/noticeFeedsStats.model';

@Component({
    selector: 'app-notice-feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class FeedsComponent implements OnInit, OnDestroy {
    instances: NoticeFeed[] ;
    firstTime: boolean;
    subscription: Subscription;
    noticeId: string;
    lastFilters;
    stats: NoticeFeedsStats;

    constructor(private title: TitleService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private noticeService: NoticesService,
                public paginator: PaginatorService) {
        this.instances = [];
        this.stats = {
            receivers: null,
            readed: {
               amount: null,
               percentage: null
            },
            delivered: {
                amount: null,
                percentage: null
            },
            sent: {
                amount: null,
                percentage: null
            }
        };
    }

    ngOnInit() {
        const notice: Notice = this.route.snapshot.data['notice'];

        this.noticeId = notice.id;

        this.paginator.createStream(this.noticeService.fetchNoticeFeeds.bind(this.noticeService)).subscribe(
            (noticeFeeds: NoticeFeed[]) => this.handleSubscriptionResponse(noticeFeeds),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set(`${this.translator.instant('notices.feeds.title')}: ${notice.title}`);

        this.noticeService.getFeedsStats(notice.id)
            .subscribe((stats: NoticeFeedsStats) => {
                this.stats = stats;
            });

        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);

                this.noticeService.getFeedsStats(notice.id)
                    .subscribe((stats) => this.stats = stats);

            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleSubscriptionResponse(noticeFeeds: NoticeFeed[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = noticeFeeds :
            this.instances.push(...noticeFeeds);
    }

    handleSubscriptionError(error: any) {
        console.log(error);
    }

    onFiltersChange(filters: any) {
        filters = {
            id: this.noticeId,
            ...filters
        };
        this.lastFilters = filters;
        this.paginator.setFilters(filters);
    }

    onLoadMore() {
        this.paginator.nextPage();
    }

}
