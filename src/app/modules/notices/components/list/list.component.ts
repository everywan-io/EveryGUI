import { Component, OnInit } from '@angular/core';

import { Notice } from '@models/notices.model';
import { TitleService } from '@services/title.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { NoticesService } from '@modules/notices/notices.service';

@Component({
    selector: 'app-notices-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: Notice[] ;

    constructor(private title: TitleService,
                private dropDownConfig: NgbDropdownConfig,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private noticeService: NoticesService,
                public paginator: PaginatorService) {
        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';
    }

    ngOnInit() {
        this.paginator.createStream(this.noticeService.fetch.bind(this.noticeService)).subscribe(
            (notices: Notice[]) => this.handleSubscriptionResponse(notices),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('notices.list.title');
    }

    handleSubscriptionResponse(notices: Notice[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = notices :
            this.instances.push(...notices);
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
