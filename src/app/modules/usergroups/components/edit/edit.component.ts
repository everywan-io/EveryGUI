import { Component, HostListener, OnInit } from '@angular/core';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { User } from '@models/users.model';
import { TitleService } from '@services/title.service';
import { ResponsiveState } from 'ngx-responsive';
import { UsergroupsService } from '@modules/usergroups/usergroups.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-groups-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [
        PaginatorService
    ]
})

export class EditComponent implements OnInit {
    instances: User[];
    screenWidth: number;

    constructor( private title: TitleService,
                 private userGroupsService: UsergroupsService,
                 private device: ResponsiveState,
                 private route: ActivatedRoute,
                 public paginator: PaginatorService) {

        this.instances = [];

        this.onResize();
    }

    ngOnInit() {

        if (this.screenWidth > 991) {
            this.paginator.createStream(this.userGroupsService.fetchUsers.bind(this.userGroupsService)).subscribe(
                (users: User[]) => {
                    this.handleSubscriptionResponse(users)},
                (error: any) => this.handleSubscriptionError(error)
            );

            this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;
            this.paginator.setFilters({});
        }

        if (this.route.snapshot.data['mode'] === 'edit') {
            this.title.set('userGroups.edit.title');
        } else {
            this.title.set('userGroups.create.title');
        }

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

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenWidth = window.innerWidth;
    }

}
