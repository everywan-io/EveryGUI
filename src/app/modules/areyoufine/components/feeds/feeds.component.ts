import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { InquiryFeed } from '@models/inquiryFeeds.model';
import { TitleService } from '@services/title.service';
import { ResponsiveState } from 'ngx-responsive';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { InquiryFeedStats } from '@models/inquiryFeedsStats.model';

@Component({
    selector: 'app-are-you-fine-feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class FeedsComponent implements OnInit, OnDestroy {
    instances: InquiryFeed[] ;
    inquiryId: string;
    firstTime: boolean;
    subscription: Subscription;
    stats: InquiryFeedStats;
    lastFilters;

    constructor(private title: TitleService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private areYouFineService: AreyoufineService,
                public paginator: PaginatorService) {
        this.instances = [];
        this.firstTime = true;
        this.stats = {
            receivers: null,
            sent: {
                amount: null,
                percentage: null,
            },
            delivered: {
                amount: null,
                percentage: null,
            },
            readed: {
                amount: null,
                percentage: null,
            },
            withResponse: {
                amount: null,
                percentage: null,
            }
        };
    }

    ngOnInit() {
        this.inquiryId = this.route.snapshot.paramMap.get('id');

        this.paginator.createStream(this.areYouFineService.fetchInquiryFeeds.bind(this.areYouFineService)).subscribe(
            (inquiryFeeds: InquiryFeed[]) => this.handleSubscriptionResponse(inquiryFeeds),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set(
            this.translator.instant('areYouFine.feeds.title',
                { time: new Date (this.route.snapshot.data['inquiry'].createdAt).toLocaleString()}));

        this.firstTime = false;

        this.areYouFineService.getFeedsStats(this.inquiryId)
            .subscribe((stats) => {
                this.stats = stats;
            });

        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);

                this.areYouFineService.getFeedsStats(this.inquiryId)
                    .subscribe((stats) => this.stats = stats);
            });

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleSubscriptionResponse(inquiryFeeds: InquiryFeed[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = inquiryFeeds :
            this.instances.push(...inquiryFeeds);
    }

    handleSubscriptionError(error: any) {
        console.log(error);
    }

    onFiltersChange(filters: any) {
        filters = {
            id: this.inquiryId,
            ...filters
        };
        this.lastFilters = filters;
        this.paginator.setFilters(filters);
    }

    onLoadMore() {
        this.paginator.nextPage();
    }

}
