import { Component, OnInit } from '@angular/core';

import { TitleService } from '@services/title.service';
import { OverlayNet, OverlayNetType } from '@models/overlaynets.model';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { OverlayNetsService } from '@modules/overlaynets/overlaynets.service';
import { ResponsiveState } from 'ngx-responsive';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { NgProgress } from '@ngx-progressbar/core';
import { BreadcrumbService } from '@everywan/services/breadcrumb.service';

@Component({
    selector: 'app-overlaynets-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    readonly OverlayNetType = OverlayNetType;

    instances: OverlayNet[];

    constructor(private title: TitleService,
        private breadcrumb: BreadcrumbService,
        private overlaynetService: OverlayNetsService,
        private overlaynet: ResponsiveState,
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
        this.paginator.createStream(this.overlaynetService.fetch.bind(this.overlaynetService, { do: 'o' })).subscribe(
            (overlaynets: OverlayNet[]) => this.handleSubscriptionResponse(overlaynets),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.overlaynet.isMobile() ? 120 : 60;

        this.title.set('overlaynets.list.title');
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: 'Overlay Networks'
            }
        ]);
    }

    handleSubscriptionResponse(overlaynets: OverlayNet[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = overlaynets :
            this.instances.push(...overlaynets);
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


    onOverlayNetDelete(id: string) {
        let deleteIsInProgress = false;
        const overlaynet = this.instances.find((instance: OverlayNet) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('overlaynets.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('overlaynets.list.modals.delete.message', { overlaynet: overlaynet.name });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('overlaynets.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('overlaynets.list.modals.delete.actions.confirm');
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

                    this.overlaynetService
                        .delete(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/overlaynets']));
                            this.notifications.success(
                                this.translator.instant('overlaynets.list.notifications.delete.title'),
                                this.translator.instant('overlaynets.list.notifications.delete.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                this.router.navigate(['/overlaynets']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('overlaynets.list.notifications.delete.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
