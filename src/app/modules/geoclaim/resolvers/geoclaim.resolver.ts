import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Inquiry } from '@models/inquiries.model';
import { GeoclaimService } from '@modules/geoclaim/geoclaim.service';
import { map } from 'rxjs/operators';

@Injectable()
export class GeoclaimResolver implements Resolve<Observable<Inquiry>> {
    constructor(private geoclaimService: GeoclaimService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Inquiry> {
        const inquiryIdentifier: string = route.paramMap.get('id');

        return this.geoclaimService.get(inquiryIdentifier)
            .pipe(
                map((inquiry: Inquiry) => inquiry)
            );
    }
}
