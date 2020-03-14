import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {OverlayNet} from '@models/overlaynets.model';
import {ApplicationState} from '@services/store/store.state';
import {OverlayNetsService} from '@modules/overlaynets/overlaynets.service';

@Injectable()
export class OverlayNetResolver implements Resolve<Observable<OverlayNet>> {
    constructor(private store: Store<ApplicationState>,
                private overlaynets: OverlayNetsService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<OverlayNet> {
        const overlaynetIdentifier: string = route.paramMap.get('id');

        // FIXME fetch from ngrx store and from remote if it doesn't exists
        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((overlaynet: OverlayNet) => {
                // if (!user || user.id !== overlaynetIdentifier) {
                    return this.overlaynets.get(overlaynetIdentifier);
                // }

                // return of(user);
            })
        );
    }
}
