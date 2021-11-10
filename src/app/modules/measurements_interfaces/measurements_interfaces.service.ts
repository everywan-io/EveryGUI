import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Measurement } from '@models/measurement.model';
import { ApiService } from '@modules/network/api.service';
import { MeasurementsFactory } from '@models/factories/measurement.factory';
import { MeasurementDescriptorInterface } from '@configs/network/api.descriptors';


@Injectable()
export class MeasurementsService {
    constructor(private API: ApiService) {

    }

    enable(identifier: string): Observable<Measurement> {
        return this.API.Measurement
            .enable({ sessionId: identifier })
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    disable(identifier: string): Observable<Measurement> {
        return this.API.Measurement
            .disable({ sessionId: identifier })
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    configure(payload: any): Observable<Measurement> {
        return this.API.Measurement
            .configure(payload)
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    get(identifier: string): Observable<Measurement> {
        return this.API.Measurement
            .get({ sessionId: identifier })
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    fetch(payload: any): Observable<Measurement[]> {
        return this.API.Measurement
            .fetch(payload)
            .pipe(
                map((measurement: MeasurementDescriptorInterface[]) => MeasurementsFactory.create(measurement) as Measurement[])
            );
    }
}
