import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Audit } from '@models/audit.model';
import { AuditDescriptorInterface } from '@configs/network/api.descriptors';
import { AuditFactory } from '@models/factories/audit.factory';


@Injectable()
export class AuditService {
    constructor(private API: ApiService) {

    }

    get(): Observable<Audit> {
        return this.API.Audit
            .get()
            .pipe(
                map((audit: AuditDescriptorInterface) => AuditFactory.create(audit) as Audit)
            );
    }

}
