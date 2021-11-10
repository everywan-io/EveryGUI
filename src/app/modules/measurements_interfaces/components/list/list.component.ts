import { Component, OnInit } from '@angular/core';

import { TitleService } from '@services/title.service';
import { Measurement } from '@models/measurement.model';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { MeasurementsService } from '@modules/measurements_interfaces/measurements_interfaces.service';
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
export class ListComponent implements OnInit {
    subscription: Subscription;
    lastFilters;
    instances: Measurement[];

    constructor(private title: TitleService,
        private breadcrumb: BreadcrumbService,
        private measurementService: MeasurementsService,
        private measurement: ResponsiveState,
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
        this.paginator.createStream(this.measurementService.fetch.bind(this.measurementService)).subscribe(
            (measurements: Measurement[]) => this.handleSubscriptionResponse(measurements),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.measurement.isMobile() ? 120 : 60;

        this.title.set('measurements.list.title');
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: 'Measurement Sessions'
            }
        ]);
        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);
            });

    }

    handleSubscriptionResponse(measurements: Measurement[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = measurements :
            this.instances.push(...measurements);
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

    onEnableMeasurement(id: string) {
        let enableIsInProgress = false;
        const measurement = this.instances.find((instance: Measurement) => instance.sessionId === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('measurements.list.modals.enable.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('measurements.list.modals.enable.message', { measurement: measurement.sessionId });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('measurements.list.modals.enable.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('measurements.list.modals.enable.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm': measurement
                    if (enableIsInProgress) {
                        return;
                    }

                    enableIsInProgress = true;

                    this.measurementService
                        .enable(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/measurementsessions']);
                            this.notifications.success(
                                this.translator.instant('measurements.list.notifications.enable.title'),
                                this.translator.instant('measurements.list.notifications.enable.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigate(['/measurementsessions']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('measurements.list.notifications.enable.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

    onDisableMeasurement(id: string) {
        let disableIsInProgress = false;
        const measurement = this.instances.find((instance: Measurement) => instance.sessionId === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('measurements.list.modals.disable.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('measurements.list.modals.disable.message', { measurement: measurement.sessionId });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('measurements.list.modals.disable.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('measurements.list.modals.disable.actions.confirm');
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

                    this.measurementService
                        .disable(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/measurementsessions']));
                            this.notifications.success(
                                this.translator.instant('measurements.list.notifications.disable.title'),
                                this.translator.instant('measurements.list.notifications.disable.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/measurementsessions']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('measurements.list.notifications.disable.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
