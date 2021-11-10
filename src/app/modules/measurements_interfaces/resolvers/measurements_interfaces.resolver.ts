import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Measurement } from '@models/measurement.model';
import { ApplicationState } from '@services/store/store.state';
import { MeasurementsService } from '@modules/measurements_interfaces/measurements_interfaces.service';

@Injectable()
export class MeasurementResolver implements Resolve<Observable<Measurement>> {
    constructor(private store: Store<ApplicationState>,
        private measurements: MeasurementsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Measurement> {
        const measurementIdentifier: string = route.paramMap.get('sessionId');

        // FIXME fetch from ngrx store and from remote if it doesn't exists
        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((measurement: Measurement) => {
                // if (!user || user.id !== measurementIdentifier) {
                return this.measurements.get(measurementIdentifier);
                // }

                // return of(user);
            })
        );
    }
}
