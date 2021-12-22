import { Component, OnDestroy, OnInit } from '@angular/core';

import { TitleService } from '@services/title.service';
import { Measurement } from '@models/measurement.model';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { MeasurementsService } from '@modules/measurements_interfaces/measurements_interfaces.service';
import { ResponsiveState } from 'ngx-responsive';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    subscription: Subscription;
    lastFilters;
    instances: Measurement[];
    arrayMeasurement: Measurement[];

    constructor(private title: TitleService,
        private route: ActivatedRoute,
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleSubscriptionResponse(measurements: Measurement[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = measurements :
            this.instances.push(...measurements);
        //ottieniMisure(this.instances);
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

    onRunMeasurement(sessionId: string) {
        let runIsInProgress = false;
        const measurement = this.instances.find((instance: Measurement) => instance.sessionId === sessionId);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('measurements.list.modals.run.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('measurements.list.modals.run.message', { measurement: measurement.sessionId });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('measurements.list.modals.run.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('measurements.list.modals.run.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm': measurement
                    if (runIsInProgress) {
                        return;
                    }

                    runIsInProgress = true;

                    modalConfirmReference.componentInstance.startLoading();

                    this.measurementService.putRunStop(sessionId, "start")
                        .subscribe((measurement: Measurement) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/measurementsessions']);
                            this.notifications.success(
                                this.translator.instant('measurements.list.notifications.run.title'),
                                this.translator.instant('measurements.list.notifications.run.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('measurements.list.notifications.stop.title'),
                                error.error.error
                            );
                        });
                    break;
            }
        });
    }

    onStopMeasurement(sessionId: string) {
        let stopIsInProgress = false;
        const measurement = this.instances.find((instance: Measurement) => instance.sessionId === sessionId);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('measurements.list.modals.stop.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('measurements.list.modals.stop.message', { measurement: measurement.sessionId });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('measurements.list.modals.stop.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('measurements.list.modals.stop.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm': measurement
                    if (stopIsInProgress) {
                        return;
                    }

                    stopIsInProgress = true;

                    modalConfirmReference.componentInstance.startLoading();

                    this.measurementService.putRunStop(sessionId, "stop")
                        .subscribe((measurement: Measurement) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/measurementsessions']);
                            this.notifications.success(
                                this.translator.instant('measurements.list.notifications.stop.title'),
                                this.translator.instant('measurements.list.notifications.stop.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('measurements.list.notifications.run.title'),
                                error.error.error
                            );
                        });
                    break;
            }
        });
    }

    onMeasurementDelete(sessionId: string) {
        let deleteIsInProgress = false;
        const measurement = this.instances.find((instance: Measurement) => instance.sessionId === sessionId);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('measurements.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('measurements.list.modals.delete.message', { measurement: measurement.sessionId });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('measurements.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('measurements.list.modals.delete.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    if (deleteIsInProgress) {
                        return;
                    }

                    deleteIsInProgress = true;

                    this.measurementService.deleteMeasurement(sessionId)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/measurementsessions']);
                            this.notifications.success(
                                this.translator.instant('measurements.list.notifications.delete.title', { measurement: measurement.sessionId }),
                                this.translator.instant('measurements.list.notifications.delete.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigate(['/measurementsessions']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('measurements.list.notifications.delete.title', { measurement: measurement.sessionId }),
                                error.error.error
                            );
                        });
                    break;
            }
        });
    }
}






