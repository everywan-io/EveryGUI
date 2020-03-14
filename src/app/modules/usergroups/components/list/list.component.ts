import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TitleService } from '@services/title.service';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { UserGroup } from '@models/userGroups.model';
import { UsergroupsService } from '@modules/usergroups/usergroups.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';

@Component({
  selector: 'app-user-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {

    instances: UserGroup[];

    constructor( private title: TitleService,
                 private dropDownConfig: NgbDropdownConfig,
                 private userGroupService: UsergroupsService,
                 private device: ResponsiveState,
                 private route: ActivatedRoute,
                 private router: Router,
                 private notifications: NotificationsService,
                 private translator: TranslateService,
                 private modal: NgbModal,
                 private progress: NgProgress,
                 public paginator: PaginatorService) {

        this.instances = [];
    }

    ngOnInit() {
        this.paginator.createStream(this.userGroupService.fetch.bind(this.userGroupService)).subscribe(
            (groups: UserGroup[]) => this.handleSubscriptionResponse(groups),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('userGroups.list.title');
    }

    handleSubscriptionResponse(groups: UserGroup[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = groups :
            this.instances.push(...groups);
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

    onUserDelete(id: string) {
        let deleteIsInProgress = false;
        const group = this.instances.find((instance: UserGroup) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('userGroups.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('userGroups.list.modals.delete.message', { group: group.name });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('userGroups.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('userGroups.list.modals.delete.actions.confirm');
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

                    this.userGroupService
                        .delete(id)
                        .subscribe(
                            () => {
                                modalConfirmReference.close(true);

                                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                    this.router.navigate(['/groups']));
                                this.notifications.success(
                                    this.translator.instant('userGroups.delete.notifications.title'),
                                    this.translator.instant('userGroups.delete.notifications.message')
                                );
                            }, (error: any) => {
                                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                    this.router.navigate(['/groups']));
                                this.progress.ref().complete();
                                this.notifications.error(
                                    this.translator.instant('userGroups.delete.notifications.title'),
                                    error.message
                                );
                            });
                    break;
            }
        });
    }

}
