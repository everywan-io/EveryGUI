import { Component, OnInit } from '@angular/core';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { TitleService } from '@services/title.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { Inquiry } from '@models/inquiries.model';

@Component({
    selector: 'app-are-you-fine-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: Inquiry[] ;

    constructor(private title: TitleService,
                private dropDownConfig: NgbDropdownConfig,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private areYouFineService: AreyoufineService,
                public paginator: PaginatorService,
    ) {
        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';
    }

    ngOnInit() {
        this.paginator.createStream(this.areYouFineService.fetchAreYouFine.bind(this.areYouFineService)).subscribe(
            (inquiries: Inquiry[]) => this.handleSubscriptionResponse(inquiries),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('areYouFine.list.title');
    }

    handleSubscriptionResponse(inquiries: Inquiry[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = inquiries :
            this.instances.push(...inquiries);
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
