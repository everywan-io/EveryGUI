import { Routes } from '@angular/router';
import { EditComponent } from '@modules/tenants/components/edit/edit.component';
import { DetailsComponent } from '@modules/tenants/components/details/details.component';
import { TenantResolver } from '@modules/tenants/resolvers/tenant.resolver';
import { ListComponent } from '@modules/tenants/components/list/list.component';

export const TenantsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
},  {
    path: 'create',
    component: EditComponent,
    data: {
        mode: 'create'
    }
}, {
    path: 'details',
    component: DetailsComponent,
    
    resolve: {
        tenant: TenantResolver
    }
}, {
    path: ':id/edit',
    component: EditComponent,
    data: {
        mode: 'edit'
    },
    resolve: {
        tenant: TenantResolver
    }
}];
