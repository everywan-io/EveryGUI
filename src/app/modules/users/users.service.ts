import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { User } from '@models/users.model';
import { UserDescriptorInterface, UserGroupDescriptorInterface } from '@configs/network/api.descriptors';
import { ApiService } from '@modules/network/api.service';
import { UsersFactory } from '@models/factories/users.factory';
import { Observable } from 'rxjs';
import { UserGroup } from '@models/userGroups.model';
import { UserGroupsFactory } from '@models/factories/userGroups.factory';

@Injectable()
export class UsersService {
    constructor( private API: ApiService ) {}

    update(payload: any): Observable<User> {
        return this.API.Users
            .update(payload)
            .pipe(
                map((user: UserDescriptorInterface) => {
                    console.log('back', user);
                    return UsersFactory.create(user) as User})
            );
    }

    fetch(payload: any): Observable<User[]> {
        return this.API.Users
            .fetch(payload)
            .pipe(
                map((users: UserDescriptorInterface[]) => UsersFactory.create(users) as User[])
            );
    }

    get(id: string): Observable<User> {
        return this.API.Users
            .get({id: id})
            .pipe(
                map((user: UserDescriptorInterface) => {
                    return UsersFactory.create(user) as User})
            );
    }

    delete(id: string) {
        return this.API.Users.delete({ id: id });
    }

    fetchGroups(payload: any): Observable<UserGroup[]> {
        return this.API.UserGroup
            .fetch(payload)
            .pipe(
                map( (groups: UserGroupDescriptorInterface[]) => UserGroupsFactory.create(groups) as UserGroup[])
            );
    }

    getGroup(id: string): Observable<UserGroup> {
        return this.API.UserGroup
            .get({id: id})
            .pipe(
              map((group: UserGroupDescriptorInterface) => UserGroupsFactory.create(group) as UserGroup)
            );
    }
}
