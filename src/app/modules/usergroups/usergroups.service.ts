import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { UserGroup } from '@models/userGroups.model';
import { UserDescriptorInterface, UserGroupDescriptorInterface } from '@configs/network/api.descriptors';
import { UserGroupsFactory } from '@models/factories/userGroups.factory';
import { User } from '@models/users.model';
import { UsersFactory } from '@models/factories/users.factory';


@Injectable()
export class UsergroupsService {
    constructor( private API: ApiService) {}

    fetch(payload: any): Observable<UserGroup[]> {
        return this.API.UserGroup
            .fetch(payload)
            .pipe(
                map((groups: UserGroupDescriptorInterface[]) => {
                    return UserGroupsFactory.create(groups) as UserGroup[];
                })
            );
    }

    get(id: string) {
        return this.API.UserGroup
            .get({ id: id })
            .pipe(
                map((group: UserGroupDescriptorInterface) => UserGroupsFactory.create(group) as UserGroup)
            );
    }

    delete(id: string) {
        return this.API.UserGroup.delete({ id: id });
    }

    create(payload: any) {
        return this.API.UserGroup
            .create(payload)
            .pipe(
                map((group: UserGroupDescriptorInterface) => UserGroupsFactory.create(group) as UserGroup)
            );
    }

    update(payload: any) {
        return this.API.UserGroup
            .update(payload)
            .pipe(
                map((group: UserGroupDescriptorInterface) => UserGroupsFactory.create(group) as UserGroup)
            );
    }

    fetchUsers(payload: any): Observable<User[]> {
        return this.API.Users
            .fetch(payload)
            .pipe(
                map((users: UserDescriptorInterface[]) => UsersFactory.create(users) as User[])
            );
    }
}
