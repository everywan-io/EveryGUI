import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Inquiry } from '@models/inquiries.model';
import { AreyoufineService } from '@modules/areyoufine/areyoufine.service';
import { map } from 'rxjs/operators';


@Injectable()
export class AreYouFineResolver implements Resolve<Observable<Inquiry>> {
    constructor( private areYouFineService: AreyoufineService ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Inquiry> {
        const inquiryIdentifier: string = route.paramMap.get('id');

        return this.areYouFineService.get(inquiryIdentifier)
            .pipe(
                map(( inquiry: Inquiry) => inquiry)
            );
    }

}
