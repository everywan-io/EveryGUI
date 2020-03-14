import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { UsersStats } from '@models/usersStats.model';
import { UserLocationDescriptorInterface, UsersStatsDescriptorInterface } from '@configs/network/api.descriptors';
import { UsersStatsFactory } from '@models/factories/usersStats.factory';
import { UserLocation } from '@models/userLocation.model';
import { UserLocationFactory } from '@models/factories/userLocation.factory';

@Injectable()
export class UserslocationService {
    constructor( private API: ApiService) {}

    fetchStats(): Observable<UsersStats> {
        return this.API.Users
            .stats()
            .pipe(
                map((usersStats: UsersStatsDescriptorInterface) => UsersStatsFactory.create(usersStats) as UsersStats)
            );
    }

    fetchLocations(): Observable<UserLocation[]> {
        return this.API.Users
            .fetchLocations()
            .pipe(
                map((userLocation: UserLocationDescriptorInterface) => UserLocationFactory.create(userLocation) as UserLocation)
            );
    }
}
