import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { TitleService } from '@services/title.service';
import { ResponsiveState } from 'ngx-responsive';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { Signal } from '@models/signals.model';
import { SignalsService } from '@modules/signals/signals.service';

@Component({
    selector: 'app-signal-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: Signal[] ;
    timestamp = Date.now();

    constructor(private title: TitleService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private signalService: SignalsService,
                public paginator: PaginatorService) {
        this.instances = [];
    }

    ngOnInit() {
        this.paginator.createStream(this.signalService.fetch.bind(this.signalService)).subscribe(
            (signals: Signal[]) => this.handleSubscriptionResponse(signals),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('signals.list.title');
    }

    handleSubscriptionResponse(signals: Signal[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = signals :
            this.instances.push(...signals);
    }

    handleSubscriptionError(error: any) {
        console.log(error);
    }

    onFiltersChange(filters: any) {
        this.paginator.setFilters(filters);
    }

    onLoadMore() {
        this.paginator.nextPage();
    }

}
