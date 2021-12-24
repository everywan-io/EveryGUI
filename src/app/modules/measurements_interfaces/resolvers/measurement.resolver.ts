import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ApplicationState } from '@services/store/store.state';
import { Measurement } from '@everywan/models/measurement.model';
import { MeasurementsService } from '../measurements_interfaces.service';

@Injectable()
export class MeasurementAvailableResolver implements Resolve<Observable<Measurement[]>> {
    constructor(private store: Store<ApplicationState>,
        private measurements: MeasurementsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Measurement[]> {

        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((measurement: Measurement) => {
                // if (!user || user.id !== overlaynetIdentifier) {
                return this.measurements.fetch({ available: true });
                // }

                // return of(user);
            })
        );
    }
}
