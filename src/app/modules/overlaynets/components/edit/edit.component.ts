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


@Component({
    selector: 'app-overlaynets-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    form: FormGroup;
    mode: 'configure' | 'create';
    button: {
        state: ButtonStates,
        title: string;
    };

    loading: {
        term: boolean;
    };

    overlaynetTypes = [
        { title: 'IPv4Overlay', value: OverlayNetType.IPv4Overlay },
        { title: 'IPv6Overlay', value: OverlayNetType.IPv6Overlay }];



    interfaces: Interface[];

    tunnelTypes = [
        { title: 'VXLAN', value: 'VXLAN' },
    ];
    slices: any;


    constructor(private title: TitleService,
        private breadcrumb: BreadcrumbService,
        private route: ActivatedRoute,
        private overlaynetService: OverlayNetsService,
        private modal: NgbModal,
        private translator: TranslateService,
        private router: Router,
        private notifications: NotificationsService,
        private progress: NgProgress) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'overlaynets.edit.actions.send'
        };

        this.loading = {
            term: false
        };

    }

    ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];
        this.form = this.defineForm(this.mode === 'configure');

        this.interfaces = this.route.snapshot.data['interfaces'];
        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `overlaynets.edit.actions.${this.mode}`;
        this.slices = {};
        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'configure'));



        this.form.statusChanges
            .subscribe(() => {
                this.button.state = (this.form.valid) ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

        this.title.set(`overlaynets.edit.title.${this.route.snapshot.data['mode']}`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/overlaynets',
                label: 'Overlay Networks'
            },
            {
                label: this.mode === 'create' ? 'Create' : 'Configure'
            }
        ]);
    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(configure: boolean) {
        const overlaynet: OverlayNet = this.route.snapshot.data['overlaynet'];

        const initialValues = {
            id: configure ? overlaynet.id : null,
            name: configure ? overlaynet.name : null,
            description: configure ? overlaynet.description : null,
            type: configure ? overlaynet.type : null,
            tunnelType: configure ? overlaynet.tunnelType : null,
            tenantId: configure ? overlaynet.tenantId : null,
            slices: configure ? overlaynet.slices : null
        };


        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'id': new FormControl(initialValues.id, []),
            'name': new FormControl({ value: initialValues.name, disabled: configure }, [Validators.required]),
            'description': new FormControl({ value: initialValues.description, disabled: configure }, [Validators.required]),
            'type': new FormControl({ value: initialValues.type, disabled: configure }, [Validators.required]),
            'tunnelType': new FormControl({ value: initialValues.tunnelType, disabled: configure }, [Validators.required]),
            //'slices': new FormControl({ value: initialValues.type, disabled: details }, [Validators.required])
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

        modalConfirmReference.componentInstance.title = this.translator.instant(`overlaynets.edit.modals.${this.route.snapshot.data['mode']}.title`);
        modalConfirmReference.componentInstance.message = this.translator.instant(`overlaynets.edit.modals.${this.route.snapshot.data['mode']}.message`, { overlaynet: this.form.get('name').value });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant(`overlaynets.edit.modals.${this.route.snapshot.data['mode']}.actions.cancel`);
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant(`overlaynets.edit.modals.${this.route.snapshot.data['mode']}.actions.confirm`);
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
                        name: this.form.get('name').value,
                        description: this.form.get('description').value,
                        type: this.form.get('type').value,
                        tunnel_type: this.form.get('tunnelType').value,
                        slices: this._getSlices()
                    };


                    modalConfirmReference.componentInstance.startLoading();

                    this.overlaynetService.create(payload)
                        .subscribe((overlaynet: OverlayNet) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/overlaynets']);
                            this.notifications.success(
                                this.translator.instant(`overlaynets.edit.notifications.${this.route.snapshot.data['mode']}.title`),
                                this.translator.instant(`overlaynets.edit.notifications.${this.route.snapshot.data['mode']}.message`)
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant(`overlaynets.edit.notifications.${this.route.snapshot.data['mode']}.title`),
                                error.error.error
                            );
                        });
                    break;
            }
        });
    }

    onDeviceInterfaceSelected(event: any) {
        const action = event.action;
        console.log(event)
        if (action === 'upsert') {
            console.log('siamo dentro?');
            this.slices[event.deviceId] = [event.deviceId, event.interface];

        } else if (action === 'remove') {
            console.log('siamo dentro e rimuoviamo?');
            delete this.slices[event.deviceId];
        }

        console.log(this.slices);
    }

    _getSlices() {
        const slices_payload = [];
        console.log("_getSlices");
        for (const key in this.slices) {
            if (this.slices.hasOwnProperty(key)) {
                slices_payload.push(this.slices[key]);
            }
        }
        console.log(slices_payload);
        return slices_payload;
    }


}
