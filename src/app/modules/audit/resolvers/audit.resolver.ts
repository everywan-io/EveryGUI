import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Audit } from '@models/audit.model';
import { AuditService } from '@modules/audit/audit.service';

@Injectable()
export class AuditResolver implements Resolve<Observable<Audit>> {
    constructor(private auditService: AuditService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Audit> {
        return this.auditService.get()
            .pipe(
                map((audit: Audit) => audit)
            );
    }
}
