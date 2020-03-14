import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {Operator} from '@models/operators.model';
import {ApplicationState} from '@services/store/store.state';
import {OperatorsService} from '@modules/operators/operators.service';

@Injectable()
export class OperatorResolver implements Resolve<Observable<Operator>> {
    constructor(private store: Store<ApplicationState>,
                private operators: OperatorsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Operator> {
        const operatorIdentifier: string = route.paramMap.get('id');

        // FIXME fetch from ngrx store and from remote if it doesn't exists
        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((operator: Operator) => {
                // if (!user || user.id !== operatorIdentifier) {
                    return this.operators.get(operatorIdentifier);
                // }

                // return of(user);
            })
        );
    }
}
