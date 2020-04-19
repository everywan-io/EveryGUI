import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { OverlayNet } from '@models/overlaynets.model';
import { Interface } from '@models/interfaces.model';
import { ApplicationState } from '@services/store/store.state';
import { DevicesService } from '@modules/devices/devices.service';

@Injectable()
export class InterfaceAvailableResolver implements Resolve<Observable<Interface[]>> {
    constructor(private store: Store<ApplicationState>,
        private Devices: DevicesService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Interface[]> {

        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((overlaynet: OverlayNet) => {
                // if (!user || user.id !== overlaynetIdentifier) {
                return this.Devices.getInterfaces({available: true});
                // }

                // return of(user);
            })
        );
    }
}
