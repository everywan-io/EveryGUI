import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ButtonStates} from '@modules/shared/components/button/button.component';
import {TitleService} from '@services/title.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {NotificationsService} from '@modules/notifications/notifications.service';
import {NgProgress} from '@ngx-progressbar/core';
import {AttachedItem, AttachmentManagerService} from '@modules/shared/services/attachmentManager.service';
import {SignalsService} from '@modules/signals/signals.service';
import {ModalConfirmComponent} from '@modules/shared/components/modals/confirm/confirm.component';
import {SignalResponse} from '@models/signals.model';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.scss'],
    providers: [
        AttachmentManagerService
    ]
})
export class ResponseComponent implements OnInit {
    form: FormGroup;
    attachments = [];

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private title: TitleService,
                private route: ActivatedRoute,
                private signalService: SignalsService,
                private modal: NgbModal,
                private translator: TranslateService,
                private router: Router,
                private notifications: NotificationsService,
                private progress: NgProgress,
                public attachmentManager: AttachmentManagerService) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'signals.response.actions.respond'
        };

    }

    /* tslint:disable object-literal-key-quotes */
    ngOnInit() {
        this.form = new FormGroup({
            'submitted': new FormControl(false, []),
            'body': new FormControl(null, [Validators.required]),
            'attachments': new FormControl(null, [])
        });

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;

        this.form.statusChanges
            .subscribe(() => {
                this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

        this.title.set('signals.response.title');

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

        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('signals.response.modals.respond.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('signals.response.modals.respond.message');
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('signals.response.modals.respond.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('signals.response.modals.respond.actions.confirm');
        modalConfirmReference.componentInstance.action.subscribe((action: string) => {
            switch (action) {
                case 'dismiss':
                    modalConfirmReference.dismiss();
                    break;
                case 'confirm':

                    const signalIdentifier: string = this.route.snapshot.paramMap.get('id');
                    const payload = {
                        id: signalIdentifier,
                        body: this.form.get('body').value,
                        attachments: this.attachmentManager.toUpload()
                    };


                    console.log(payload);

                    modalConfirmReference.componentInstance.startLoading();

                    this.signalService.createResponse(payload)
                        .subscribe((signalResponse: SignalResponse) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/signals', signalIdentifier, 'details']);
                            this.notifications.success(
                                this.translator.instant('signals.response.notifications.title'),
                                this.translator.instant('signals.response.notifications.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/signals', signalIdentifier, 'details']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('signals.response.notifications.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }


    onAttachedSelected(event) {
        for (let i = 0; i < event.target.files.length ; i++) {
            const reader = new FileReader();
            reader.readAsDataURL((event.target as HTMLInputElement).files[i]);

            let fileImage: string;
            let fileName: string;
            let fileType: string;

            fileName = (event.target as HTMLInputElement).files[i].name;
            fileType = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();

            reader.onload = () => {

                if (fileType === 'pdf') {
                    fileImage = '/assets/images/pdf.png';
                } else if (fileType === 'doc' || fileType === 'docx') {
                    fileImage = '/assets/images/word.png';
                } else if (fileType === 'ppt' || fileType === 'pptx') {
                    fileImage = '/assets/images/powerpoint.png';
                } else if (fileType === 'xls' || fileType === 'xlsx') {
                    fileImage = '/assets/images/exel.png';
                } else {
                    fileImage = reader.result as string;
                }

                const attachedItem: AttachedItem = {
                    name: (event.target as HTMLInputElement).files[i].name,
                    type: fileType,
                    image: fileImage,
                    blob: event.target.files[0],
                };
                this.attachmentManager.add(attachedItem);
            };
        }

    }

    onAttachedRemove(index: number) {
        this.attachmentManager.remove(index);
    }
}
