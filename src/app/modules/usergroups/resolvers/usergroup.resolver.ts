import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserGroup } from '@models/userGroups.model';
import { UsergroupsService } from '@modules/usergroups/usergroups.service';


@Injectable()
export class UsergroupResolver implements Resolve<Observable<UserGroup>> {
    constructor(private userGroupsService: UsergroupsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserGroup> {

        // FIXME fetch from ngrx store and from remote if it doesn't exists
        return this.userGroupsService.get(route.params['id'])
            .pipe(
                map((group: UserGroup) => group)
            );
    }
}


