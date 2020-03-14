import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Tenant} from '@models/tenants.model';
import {ApiService} from '@modules/network/api.service';
import {TenantsFactory} from '@models/factories/tenants.factory';
import {TenantDescriptorInterface} from '@configs/network/api.descriptors';


@Injectable()
export class TenantsService {
    constructor(private API: ApiService) {

    }

    create(payload: any): Observable<Tenant> {
        return this.API.Tenants
            .create(payload)
            .pipe(
                map((tenant: TenantDescriptorInterface) => TenantsFactory.create(tenant) as Tenant)
            );
    }

    get(identifier: string): Observable<Tenant> {
        return this.API.Tenants
            .get({ id: identifier })
            .pipe(
                map((tenant: TenantDescriptorInterface) => TenantsFactory.create(tenant) as Tenant)
            );
    }

    delete(id: string) {
        return this.API.Tenants.delete({ id: id });
    }

    update(payload: any): Observable<Tenant> {
        return this.API.Tenants
            .update(payload)
            .pipe(
                map((tenant: TenantDescriptorInterface) => TenantsFactory.create(tenant) as Tenant)
            );
    }

    fetch(payload: any): Observable<Tenant[]> {
        return this.API.Tenants
            .fetch(payload)
            .pipe(
                 map((tenants: TenantDescriptorInterface[]) => TenantsFactory.create(tenants) as Tenant[])
            );
    }
}
