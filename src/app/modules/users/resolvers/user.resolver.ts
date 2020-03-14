import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@models/users.model';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
    constructor(private userService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        const userIdentifier: string = route.paramMap.get('id');

        return this.userService.get(userIdentifier)
            .pipe(
                map((user: User) => user)
            );
    }
}
