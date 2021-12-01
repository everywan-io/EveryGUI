import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ApplicationState } from '@services/store/store.state';
import { Measurement } from '@everywan/models/measurement.model';
import { OverlayNetsService } from '@everywan/modules/overlaynets/overlaynets.service';
import { OverlayNet } from '@everywan/models/overlaynets.model';

@Injectable()
export class OverlayMeasurementAvailableResolver implements Resolve<Observable<OverlayNet[]>> {
    constructor(private store: Store<ApplicationState>,
        private overlaynets: OverlayNetsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<OverlayNet[]> {

        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((measurement: Measurement) => {
                // if (!user || user.id !== overlaynetIdentifier) {
                return this.overlaynets.fetch({ available: true });
                // }

                // return of(user);
            })
        );
    }
}
