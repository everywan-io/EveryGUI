import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { OverlayNet, OverlayNetType } from '@models/overlaynets.model';
import { Device } from '@models/devices.model';
import { TitleService } from '@services/title.service';
import { OverlayNetsService } from '@modules/overlaynets/overlaynets.service';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { DatesService } from '@services/dates.service';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NotificationsService } from '@modules/notifications/notifications.service';
import * as Moment from 'moment';
import { Interface } from '@everywan/models/interfaces.model';
import { BreadcrumbService } from '@everywan/services/breadcrumb.service';
import { MeasurementsService } from '../../measurements_interfaces.service';
import { Measurement } from '@everywan/models/measurement.model';
import { PaginatorService } from '@everywan/modules/shared/services/paginator.service';
import { DevicesService } from '@everywan/modules/devices/devices.service';
import { format } from 'url';

@Component({
    selector: 'app-overlaynets-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class EditComponent implements OnInit {

    overlaynets: OverlayNet[];
    device: Device[];
    form: FormGroup;
    mode: 'configure' | 'create';
    button: {
        state: ButtonStates,
        title: string;
    };

    loading: {
        term: boolean;
    };

    authenticationModeTypes = [
        { title: 'Unauthenticated', value: 'Unauthenticated' }];

    timestampFormatTypes = [
        { title: 'NTP', value: 'NTP' }];

    delayMeasurementModeTypes = [
        { title: 'Two Way', value: 'Two Way' },
        { title: 'One Way', value: 'One Way' }];

    sessionReflectorModeTypes = [
        { title: 'Stateless', value: 'Stateless' }];

    sessionTypes = [];

    checkTypes = [
        { title: 'YES', value: 'YES' },
        { title: 'NO', value: 'NO' }];

    overlayTypes = [];

    constructor(private title: TitleService,
        private breadcrumb: BreadcrumbService,
        private route: ActivatedRoute,
        public paginator: PaginatorService,
        private measurementService: MeasurementsService,
        private modal: NgbModal,
        private translator: TranslateService,
        private router: Router,
        private notifications: NotificationsService,
        private progress: NgProgress) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'measurements.edit.actions.send'
        };

        this.loading = {
            term: false
        };

    }

    ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];
        this.form = this.defineForm(this.mode === 'configure');

        this.defineDevice();
        this.defineOverlay();

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `measurements.edit.actions.${this.mode}`;
        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'configure'));

        this.form.statusChanges
            .subscribe(() => {
                this.button.state = (this.form.valid) ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

        this.title.set(`measurements.edit.title.${this.route.snapshot.data['mode']}`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/measurementsessions',
                label: 'Measurement Sessions'
            },
            {
                label: this.mode === 'create' ? 'Create' : 'Configure'
            }
        ]);

    }

    private defineOverlay() {
        const overlaynets: OverlayNet = this.route.snapshot.data['overlaynets'];
        var array = overlaynets;
        for (let i in array) {
            var stringa = array[i].name + '/' + array[i].id;
            this.overlayTypes.push({ title: array[i].name + '/' + array[i].id, value: stringa });
        }
    }

    private defineDevice() {
        const device: Device = this.route.snapshot.data['device'];
        var array = device;
        for (let i in array) {
            var stringa = array[i].name + '/' + array[i].id;
            this.sessionTypes.push({ title: array[i].name + '/' + array[i].id, value: stringa });
        }
    }

    private defineForm(configure: boolean) {
        const measurement: Measurement = this.route.snapshot.data['measurement'];

        const initialValues = {
            interval: configure ? measurement.interval : null,
            authenticationMode: configure ? measurement.authenticationMode : null,
            keyChain: configure ? measurement.keyChain : null,
            timestampFormat: configure ? measurement.timestampFormat : null,
            delayMeasurementMode: configure ? measurement.delayMeasurementMode : null,
            sessionReflectorMode: configure ? measurement.sessionReflectorMode : null,
            sessionSender: configure ? measurement.senderName : null,
            sessionSenderDeviceId: configure ? measurement.senderDeviceId : null,
            sessionReflector: configure ? measurement.reflectorName : null,
            sessionReflectorDeviceId: configure ? measurement.reflectorDeviceId : null,
            sidlist: configure ? measurement.sidlist : null,
            returnSidlist: configure ? measurement.returnSidlist : null,
            duration: configure ? measurement.duration : null,
            measurementStatus: configure ? measurement.status : null,
            runOptions: null,
            overlaySession: configure ? measurement.overlayId : null,
            overlayName: configure ? measurement.overlayName : null
        };


        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'interval': new FormControl(initialValues.interval, [Validators.required]),
            'authenticationMode': new FormControl({ value: initialValues.authenticationMode, disabled: configure }, [Validators.required]),
            'keyChain': new FormControl({ value: initialValues.keyChain, disabled: configure }),
            'timestampFormat': new FormControl({ value: initialValues.timestampFormat, disabled: configure }, [Validators.required]),
            'delayMeasurementMode': new FormControl({ value: initialValues.delayMeasurementMode, disabled: configure }, [Validators.required]),
            'sessionReflectorMode': new FormControl({ value: initialValues.sessionReflectorMode, disabled: configure }, [Validators.required]),
            'sessionSender': new FormControl({ value: initialValues.sessionSender, disabled: configure }, [Validators.required]),
            'sessionReflector': new FormControl({ value: initialValues.sessionReflector, disabled: configure }, [Validators.required]),
            'sidlist': new FormControl({ value: initialValues.sidlist, disabled: configure }, [Validators.required]),
            'returnSidlist': new FormControl({ value: initialValues.returnSidlist, disabled: configure }, [Validators.required]),
            'duration': new FormControl({ value: initialValues.duration, disabled: configure }),
            'overlaySession': new FormControl({ value: initialValues.overlaySession, disabled: configure }, [Validators.required]),
            'measurementStatus': new FormControl({ value: 'Stopped', disabled: configure }),
            'runOptions': new FormControl({ value: initialValues.runOptions, disabled: configure })
        });

        return formGroup;
    }


    onSubmit() {

        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            this.form.updateValueAndValidity();
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        let createIsInProgress = false;
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant(`measurements.edit.modals.${this.route.snapshot.data['mode']}.title`);
        modalConfirmReference.componentInstance.message = this.translator.instant(`measurements.edit.modals.${this.route.snapshot.data['mode']}.message`);
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant(`measurements.edit.modals.${this.route.snapshot.data['mode']}.actions.cancel`);
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant(`measurements.edit.modals.${this.route.snapshot.data['mode']}.actions.confirm`);
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':
                    if (createIsInProgress) {
                        return;
                    }

                    createIsInProgress = true;

                    const payload = {
                        interval: this.form.get('interval').value,
                        authenticationMode: this.form.get('authenticationMode').value,
                        keyChain: this.form.get('keyChain').value,
                        timestampFormat: this.form.get('timestampFormat').value,
                        delayMeasurementMode: this.form.get('delayMeasurementMode').value,
                        sessionReflectorMode: this.form.get('sessionReflectorMode').value,
                        sessionSender: (this.form.get('sessionSender').value).split('/')[0],
                        sessionSenderDeviceId: (this.form.get('sessionSender').value).split('/')[1],
                        sessionReflector: (this.form.get('sessionReflector').value).split('/')[0],
                        sessionReflectorDeviceId: (this.form.get('sessionReflector').value).split('/')[1],
                        overlaySession: (this.form.get('overlaySession').value).split('/')[1],
                        overlayName: (this.form.get('overlaySession').value).split('/')[0],
                        sidlist: this.form.get('sidlist').value,
                        returnSidlist: this.form.get('returnSidlist').value,
                        duration: this.form.get('duration').value,
                        measurementStatus: this.form.get('measurementStatus').value,
                        runOptions: this.form.get('runOptions').value
                    };

                    modalConfirmReference.componentInstance.startLoading();

                    this.measurementService.create(payload)
                        .subscribe((measurement: Measurement) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/measurementsessions']);
                            this.notifications.success(
                                this.translator.instant(`measurements.edit.notifications.${this.route.snapshot.data['mode']}.title`),
                                this.translator.instant(`measurements.edit.notifications.${this.route.snapshot.data['mode']}.message`)
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant(`measurements.edit.notifications.${this.route.snapshot.data['mode']}.title`),
                                error.error.error
                            );
                        });
                    break;
            }
        });
    }
}
