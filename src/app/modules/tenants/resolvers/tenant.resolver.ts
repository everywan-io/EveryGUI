import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {Tenant} from '@models/tenants.model';
import {Operator} from '@models/operators.model';
import {ApplicationState} from '@services/store/store.state';
import {TenantsService} from '@modules/tenants/tenants.service';

@Injectable()
export class TenantResolver implements Resolve<Observable<Tenant>> {
    constructor(private store: Store<ApplicationState>,
                private tenants: TenantsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Tenant> {

        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((operator: Operator) => {
                
                return this.tenants.get((operator).project_id);
                
            })
        );
    }
}
