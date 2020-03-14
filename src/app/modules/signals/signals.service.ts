import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import {SignalDescriptorInterface, SignalResponseDescriptorInterface} from '@configs/network/api.descriptors';
import {Signal, SignalResponse} from '@models/signals.model';
import { SignalsFactory } from '@models/factories/signals.factory';

@Injectable()
export class SignalsService {

    constructor(private API: ApiService) {
    }

    fetch(payload: any): Observable<Signal[]> {
        return this.API.Signals
            .fetch(payload)
            .pipe(
                map((signals: SignalDescriptorInterface[]) => SignalsFactory.create(signals) as Signal[])
            );
    }

    get(id: string): Observable<Signal> {
        return this.API.Signals
            .get({id: id})
            .pipe(
                map((signal: SignalDescriptorInterface) => SignalsFactory.create(signal) as Signal)
            );
    }

    createResponse(paylod: any): Observable<SignalResponse> {
        return this.API.Signals
            .createResponse(paylod)
            .pipe(
                map((signalResponse: SignalResponseDescriptorInterface) => SignalsFactory.createResponse(signalResponse) as SignalResponse)
            );
    }

}
