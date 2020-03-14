import { Routes } from '@angular/router';

import { ListComponent } from '@modules/usergroups/components/list/list.component';
import { EditComponent } from '@modules/usergroups/components/edit/edit.component';
import { UsergroupResolver } from '@modules/usergroups/resolvers/usergroup.resolver';

export const UsergroupsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: 'create',
    component: EditComponent,
    data: {
        mode: 'create'
    }
}, {
    path: ':id/edit',
    component: EditComponent,
    data: {
        mode: 'edit'
    },
    resolve: {
        group: UsergroupResolver
    }
}];
