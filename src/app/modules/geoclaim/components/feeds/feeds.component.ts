import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { InquiryFeed } from '@models/inquiryFeeds.model';
import { TitleService } from '@services/title.service';
import { ResponsiveState } from 'ngx-responsive';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { GeoclaimService } from '@modules/geoclaim/geoclaim.service';
import { InquiryFeedStats } from '@models/inquiryFeedsStats.model';
import * as L from 'leaflet';

@Component({
    selector: 'app-geo-claim-feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class FeedsComponent implements OnInit, OnDestroy, AfterViewInit {
    instances: InquiryFeed[];
    inquiryId: string;
    firstTime: boolean;
    subscription: Subscription;
    stats: InquiryFeedStats;
    lastFilters;
    map;

    constructor(private title: TitleService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private geoClaimService: GeoclaimService,
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
                percentage: null
            },
            withResponse: {
                amount: null,
                percentage: null,
            }
        };
    }

    ngOnInit() {
        this.inquiryId = this.route.snapshot.paramMap.get('id');

        this.paginator.createStream(this.geoClaimService.fetchInquiryFeeds.bind(this.geoClaimService)).subscribe(
            (inquiryFeeds: InquiryFeed[]) => {
                this.handleSubscriptionResponse(inquiryFeeds);
                this.getLocations();
                },
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set(
            this.translator.instant('geoClaim.feeds.title',
                { time: new Date (this.route.snapshot.data['inquiry'].createdAt).toLocaleString() }));


        this.firstTime = false;

        this.geoClaimService.getFeedsStats(this.inquiryId)
            .subscribe((stats) => {
                this.stats = stats;
            });

        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);

                this.getLocations();

                this.geoClaimService.getFeedsStats(this.inquiryId)
                    .subscribe((stats) => this.stats = stats);
            });
    }

    ngAfterViewInit() {
        this.initMap();

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        this.getLocations();

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

    initMap(): void {
        this.map = L.map('map', {
            // everywan
            center: [ 42.594401, 13.7396474 ],
            zoom: 5
        });
    }

    getLocations() {
        let marker;
        const locations = [];
        this.instances.forEach(inquiryFeed => {
            if (inquiryFeed.status === 'with_response') {
                locations.push([inquiryFeed.receiverPayload.latitude, inquiryFeed.receiverPayload.longitude]);
                marker = L.marker([inquiryFeed.receiverPayload.latitude, inquiryFeed.receiverPayload.longitude]).addTo(this.map);
                marker.bindPopup('<b>' + inquiryFeed.receiver.fullName + '</b>');
            }
        });
        this.map.fitBounds(locations);
    }

}
