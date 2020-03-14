import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { Notice, NoticeType } from '@models/notices.model';
import { TitleService } from '@services/title.service';
import { UserGroup } from '@models/userGroups.model';
import { NoticesService } from '@modules/notices/notices.service';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { DatesService } from '@services/dates.service';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { Category } from '@models/categories.model';


import {
    AttachmentManagerService,
    AttachedItem
} from '@modules/shared/services/attachmentManager.service';
import * as Moment from 'moment';


@Component({
    selector: 'app-notices-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [
        AttachmentManagerService
    ]
})
export class EditComponent implements OnInit {

    form: FormGroup;
    correctGroup: boolean;
    disableTime: boolean;
    mode: 'details' | 'create';
    categories: Category[];
    attachments = [];
    maxTitlePreviewLength = 60;
    maxBodyPreviewLength = 160;

    button: {
        state: ButtonStates,
        title: string;
    };

    loading: {
        term: boolean;
    };

    noticeType = [
        { title: 'Normal', value:  NoticeType.normal},
        { title: 'Scheduled', value: NoticeType.scheduled}];

    groupFormatter = (group: {name: string}) => group.name;

    constructor(private title: TitleService,
                private route: ActivatedRoute,
                private noticeService: NoticesService,
                private modal: NgbModal,
                private translator: TranslateService,
                private router: Router,
                private notifications: NotificationsService,
                private progress: NgProgress,
                private attachmentManager: AttachmentManagerService) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'notices.edit.actions.send'
        };

        this.loading = {
            term: false
        };

        this.categories = [];
        this.correctGroup = false;
        this.disableTime = true;
    }

    searchGroup = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap( (term) => {
                if (this.correctGroup) {
                    this.button.state = ButtonStates.DISABLED;
                    this.correctGroup = false;
                }
                if (term.length === 0) {
                    return [];
                } else if (term.length > 0 && term.length < 2) {
                    return [];
                } else {
                    return this.noticeService.fetchGroups({term: term})
                        .pipe(
                            map((groups: UserGroup[]) => groups)
                        );
                }
            })
        )

    ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];
        this.form = this.defineForm(this.mode === 'details');

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `notices.edit.actions.${this.mode}`;

        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'details'));

        if (this.mode === 'create') {
            this.noticeService.fetchCategories()
                .subscribe((categories: Category[]) => {
                    this.categories = categories;
                });
        }


        this.form.controls.type.statusChanges
            .subscribe( () => {
                if (this.form.controls.type.value === 'scheduled') {
                    this.form.controls.frequencyDate.enable();
                    this.disableTime = false;
                } else {
                    this.form.controls.frequencyDate.disable();
                    this.disableTime = true;
                }
            });

        this.form.statusChanges
            .subscribe(() => {
                this.button.state = (this.form.valid && this.correctGroup) ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

        this.title.set(`notices.edit.title.${this.route.snapshot.data['mode']}`);

    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(details: boolean) {
        const notice: Notice = this.route.snapshot.data['notice'];

        const initialValues = {
            id: details ? notice.id : null,
            title: details ? notice.title : null,
            body: details ? notice.body : null,
            titlePreview: details ? notice.titlePreview : null,
            bodyPreview: details ? notice.bodyPreview : null,
            type: details ? notice.type : '',
            categories: details && notice.category ? notice.category.name : '',
            frequencyDate: details ? DatesService.fromMomentToDateStruct(Moment(notice.frequencyDate || null)) : null,
            frequencyTime: details ? {
                hour: Moment(notice.frequencyTime || null, 'HH:mm', true).hour(),
                minute: Moment(notice.frequencyTime || null, 'HH:mm', true).minute(),
                second: 0} : {hour: 0, minute: 0, second: 0},
            group: details ? notice.recipientsGroupName : null,
            attachments: details ? notice.attachments : null
        };

        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'title': new FormControl({value: initialValues.title, disabled: details}, [Validators.required]),
            'body': new FormControl({value: initialValues.body, disabled: details}, [Validators.required]),
            'titlePreview': new FormControl({value: initialValues.titlePreview, disabled: details}, [Validators.required, Validators.maxLength(this.maxTitlePreviewLength)]),
            'bodyPreview': new FormControl({value: initialValues.bodyPreview, disabled: details}, [Validators.required, Validators.maxLength(this.maxBodyPreviewLength)]),
            'type': new FormControl({value: initialValues.type, disabled: details}, [Validators.required]),
            'category': new FormControl({value: initialValues.categories, disabled: details}, []),
            'frequencyDate': new FormControl({value: initialValues.frequencyDate, disabled: true}, [Validators.required]),
            'frequencyTime': new FormControl({value: initialValues.frequencyTime, disabled: details}, [Validators.required]),
            'group': new FormControl({value: {name: initialValues.group}, disabled: details}, [Validators.required]),
            'attachments': new FormControl({value: initialValues.attachments, disabled: details}, [])
        });

        return formGroup;
    }

    private pad(i: number): string {
        return i < 10 ? `0${i}` : `${i}`;
    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            if (field === 'group') {
                if (this.form.get(field).value.name === null){
                    this.form.get(field).setValue('');
                }
            }
            this.form.updateValueAndValidity();
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        let createIsInProgress = false;
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('notices.edit.modals.create.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('notices.edit.modals.create.message', { group: this.form.get('group').value.name });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('notices.edit.modals.create.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('notices.edit.modals.create.actions.confirm');
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

                    const capitalizePipe = new CapitalizePipe();
                    const payload = {
                        title: capitalizePipe.transform(this.form.get('title').value, 'sentences'),
                        body: capitalizePipe.transform(this.form.get('body').value, 'sentences'),
                        title_preview: capitalizePipe.transform(this.form.get('titlePreview').value, 'sentences'),
                        body_preview: capitalizePipe.transform(this.form.get('bodyPreview').value, 'sentences'),
                        type: this.form.get('type').value,
                        category: this.form.get('category').value,
                        recipients_group: this.form.get('group').value.id,
                        attachments: this.attachmentManager.toUpload()
                    };

                    if (payload.category !== undefined && payload.category.length < 1) {
                        delete payload.category;
                    }

                    if (this.form.get('type').value === 'scheduled') {
                        payload['frequency_date'] = DatesService.fromDateStructToMoment(this.form.get('frequencyDate').value).toISOString();
                        const timeValue = this.form.get('frequencyTime').value;
                        payload['frequency_time'] = `${this.pad(timeValue.hour)}:${this.pad(timeValue.minute)}`;
                    }

                    modalConfirmReference.componentInstance.startLoading();

                    this.noticeService.create(payload)
                        .subscribe((notice: Notice) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/notices', notice.id, 'feeds']);
                            this.notifications.success(
                                this.translator.instant('notices.edit.notifications.title'),
                                this.translator.instant('notices.edit.notifications.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.close(true);

                            this.router.navigate(['/notices']);
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('notices.edit.notifications.title'),
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

                if (i === event.target.files.length - 1) {
                    this.form.controls['attachments'].setValue(null);
                }

            };
        }
    }

    onAttachedRemove(index: number) {
        this.attachmentManager.remove(index);
    }
}
