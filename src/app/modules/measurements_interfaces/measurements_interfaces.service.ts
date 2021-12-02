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

    create(payload: any): Observable<Measurement> {
        return this.API.Measurement
            .create(payload)
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    putRunStop(identifier: string, command: string): Observable<Measurement> {
        return this.API.Measurement
            .putRunStop({ sessionId: identifier, command: command })
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

    getResults(identifier: string): Observable<Measurement> {
        return this.API.Measurement
            .getResults({ sessionId: identifier })
            .pipe(
                map((measurement: MeasurementDescriptorInterface) => MeasurementsFactory.create(measurement) as Measurement)
            );
    }

    deleteMeasurement(sessionId: string) {
        return this.API.Measurement.deleteMeasurement({ sessionId: sessionId });
    }

}
