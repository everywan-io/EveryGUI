import { Component, OnInit } from '@angular/core';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { Device } from '@models/devices.model';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { DevicesService } from '@modules/devices/devices.service';
import { TitleService } from '@services/title.service';

@Component({
    selector: 'app-devices-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: Device[];

    constructor(private dropDownConfig: NgbDropdownConfig,
                private deviceService: DevicesService,
                private device: ResponsiveState,
                private title: TitleService,
                public paginator: PaginatorService) {

        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';

    }

    ngOnInit() {
        this.paginator.createStream(this.deviceService.fetch.bind(this.deviceService)).subscribe(
            (devices: Device[]) => this.handleSubscriptionResponse(devices),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('devices.list.title');

    }

    handleSubscriptionResponse(devices: Device[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = devices :
            this.instances.push(...devices);
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
