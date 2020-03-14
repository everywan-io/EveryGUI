import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { OverlayNet } from '@models/overlaynets.model';
import { Device } from '@models/devices.model';
import { ApplicationState } from '@services/store/store.state';
import { DevicesService } from '@modules/devices/devices.service';

@Injectable()
export class DeviceAvailableResolver implements Resolve<Observable<Device[]>> {
    constructor(private store: Store<ApplicationState>,
        private devices: DevicesService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Device[]> {

        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((overlaynet: OverlayNet) => {
                // if (!user || user.id !== overlaynetIdentifier) {
                return this.devices.fetch({availabe: true});
                // }

                // return of(user);
            })
        );
    }
}
