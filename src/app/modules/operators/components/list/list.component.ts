import {Component, OnInit} from '@angular/core';

import {TitleService} from '@services/title.service';
import {Operator, OperatorRoles} from '@models/operators.model';
import {PaginatorService} from '@modules/shared/services/paginator.service';
import {OperatorsService} from '@modules/operators/operators.service';
import {ResponsiveState} from 'ngx-responsive';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
    selector: 'app-operators-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    readonly OperatorRoles = OperatorRoles;

    instances: Operator[];

    timestamp = Date.now();

    constructor(private title: TitleService,
                private operatorService: OperatorsService,
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
        this.paginator.createStream(this.operatorService.fetch.bind(this.operatorService)).subscribe(
            (operators: Operator[]) => this.handleSubscriptionResponse(operators),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('operators.list.title');

    }

    handleSubscriptionResponse(operators: Operator[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = operators :
            this.instances.push(...operators);
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

    onOperatorDelete(id: string) {
        let deleteIsInProgress = false;
        const operator = this.instances.find((instance: Operator) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('operators.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('operators.list.modals.delete.message', { operator: operator.fullname });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('operators.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('operators.list.modals.delete.actions.confirm');
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

                    this.operatorService
                        .delete(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/operators']));
                            this.notifications.success(
                                this.translator.instant('operators.list.notifications.delete.title'),
                                this.translator.instant('operators.list.notifications.delete.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/operators']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('operators.list.notifications.delete.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
