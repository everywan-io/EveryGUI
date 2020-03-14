import {Component, OnInit} from '@angular/core';

import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorService} from '@modules/shared/services/paginator.service';
import {User} from '@models/users.model';
import {UsersService} from '@modules/users/users.service';
import {TitleService} from '@services/title.service';
import {ResponsiveState} from 'ngx-responsive';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from '@modules/notifications/notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {NgProgress} from '@ngx-progressbar/core';
import {ModalConfirmComponent} from '@modules/shared/components/modals/confirm/confirm.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: User[];

    timestamp = Date.now();

    constructor(private title: TitleService,
                private dropDownConfig: NgbDropdownConfig,
                private userService: UsersService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private modal: NgbModal,
                public paginator: PaginatorService) {

        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';
    }

    ngOnInit() {
        this.paginator.createStream(this.userService.fetch.bind(this.userService)).subscribe(
            (users: User[]) => this.handleSubscriptionResponse(users),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('users.list.title');
    }

    handleSubscriptionResponse(users: User[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = users :
            this.instances.push(...users);
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
        const user = this.instances.find((instance: User) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('users.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('users.list.modals.delete.message', { user: user.fullname });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('users.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('users.list.modals.delete.actions.confirm');
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

                    this.userService
                        .delete(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/users']));
                            this.notifications.success(
                                this.translator.instant('users.list.notifications.delete.title'),
                                this.translator.instant('users.list.notifications.delete.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/users']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('users.list.notifications.delete.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }
}
