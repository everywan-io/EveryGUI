import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsiveState } from 'ngx-responsive';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { Category } from '@models/categories.model';
import { TitleService } from '@services/title.service';
import { CategoriesService } from '@modules/categories/categories.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NotificationsService } from '@modules/notifications/notifications.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    instances: Category[];

    constructor(private dropDownConfig: NgbDropdownConfig,
                private categoriesService: CategoriesService,
                private device: ResponsiveState,
                private title: TitleService,
                private route: ActivatedRoute,
                private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private modal: NgbModal,
                public paginator: PaginatorService) {

        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';

        this.title.set('categories.list.title');
    }

    ngOnInit() {
        this.paginator.createStream(this.categoriesService.fetch.bind(this.categoriesService)).subscribe(
            (categories: Category[]) => this.handleSubscriptionResponse(categories),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;
    }

    handleSubscriptionResponse(categories: Category[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = categories :
            this.instances.push(...categories);
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

    onCategoryDelete(id: string) {
        let deleteIsInProgress = false;
        const category = this.instances.find((instance: Category) => instance.id === id);
        const modalConfirmReference = this.modal.open(ModalConfirmComponent, { centered: true });

        modalConfirmReference.componentInstance.title = this.translator.instant('categories.list.modals.delete.title');
        modalConfirmReference.componentInstance.message = this.translator.instant('categories.list.modals.delete.message', { category: category });
        modalConfirmReference.componentInstance.buttons.dismiss = this.translator.instant('categories.list.modals.delete.actions.cancel');
        modalConfirmReference.componentInstance.buttons.confirm = this.translator.instant('categories.list.modals.delete.actions.confirm');
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

                    this.categoriesService
                        .delete(id)
                        .subscribe(() => {
                            modalConfirmReference.close(true);

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/categories']));
                            this.notifications.success(
                                this.translator.instant('categories.list.notifications.delete.title'),
                                this.translator.instant('categories.list.notifications.delete.message')
                            );
                        }, (error: any) => {
                            modalConfirmReference.dismiss();

                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/categories']));
                            this.progress.ref().complete();
                            this.notifications.error(
                                this.translator.instant('categories.list.notifications.delete.title'),
                                error.message
                            );
                        });
                    break;
            }
        });
    }

}
