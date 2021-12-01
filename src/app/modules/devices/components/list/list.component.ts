import { Component, OnDestroy, OnInit } from '@angular/core';

import { TitleService } from '@services/title.service';
import { Device, DeviceType } from '@models/devices.model';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { DevicesService } from '@modules/devices/devices.service';
import { ResponsiveState } from 'ngx-responsive';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { NgProgress } from '@ngx-progressbar/core';
import { BreadcrumbService } from '@everywan/services/breadcrumb.service';

@Component({
    selector: 'app-devices-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit, OnDestroy {
    readonly DeviceType = DeviceType;
    subscription: Subscription;
    lastFilters;
    instances: Device[];

    constructor(private title: TitleService,
        private breadcrumb: BreadcrumbService,
        private deviceService: DevicesService,
        private device: ResponsiveState,
        public paginator: PaginatorService,
        private modal: NgbModal,
        private translator: TranslateService,
        private router: Router,
        private notifications: NotificationsService,
        private progress: NgProgress,
        private dropDownConfig: NgbDropdownConfig) {

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
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: 'EveryEdges'
            }
        ]);
        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);
            });


    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleSubscriptionResponse(devices: Device[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = devices :
            this.instances.push(...devices);
        console.log(this.instances);
    }

    handleSubscriptionError(error: any) {
        console.log(error);
    }

    onFiltersChange(filters: any) {
        this.lastFilters = filters;
        this.paginator.setFilters(filters);
    }

    onLoadMore() {
        this.paginator.nextPage();
    }

    onEnableDevice(id: string) {
        let enableIsInProgress = false;
        const device = this.instances.find((instance: Device) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('devices.list.modals.enable.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('devices.list.modals.enable.message', { device: device.id });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('devices.list.modals.enable.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('devices.list.modals.enable.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    if (enableIsInProgress) {
                        return;
                    }

                    enableIsInProgress = true;

                    this.deviceService
                        .enable(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/devices']);
                            this.notifications.success(
                                this.translator.instant('devices.list.notifications.enable.title'),
                                this.translator.instant('devices.list.notifications.enable.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigate(['/devices']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('devices.list.notifications.enable.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

    onDisableDevice(id: string) {
        let disableIsInProgress = false;
        const device = this.instances.find((instance: Device) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('devices.list.modals.disable.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('devices.list.modals.disable.message', { device: device.id });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('devices.list.modals.disable.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('devices.list.modals.disable.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    if (disableIsInProgress) {
                        return;
                    }

                    disableIsInProgress = true;

                    this.deviceService
                        .disable(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/devices']));
                            this.notifications.success(
                                this.translator.instant('devices.list.notifications.disable.title'),
                                this.translator.instant('devices.list.notifications.disable.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/devices']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('devices.list.notifications.disable.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
