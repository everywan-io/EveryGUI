import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Signal } from '@models/signals.model';
import { SignalsService } from '@modules/signals/signals.service';


@Injectable()
export class SignalResolver implements Resolve<Observable<Signal>> {
    constructor(private signalsService: SignalsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Signal> {
        const signalIdentifier: string = route.paramMap.get('id');

        return this.signalsService.get(signalIdentifier)
            .pipe(
                map((signal: Signal) => signal)
            );
    }
}
