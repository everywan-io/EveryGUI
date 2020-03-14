import { Routes } from '@angular/router';

import { ListComponent } from '@modules/categories/components/list/list.component';
import { EditComponent } from '@modules/categories/components/edit/edit.component';
import { CategoryResolver } from '@modules/categories/resolvers/category.resolver';


export const CategoriesRoutes: Routes = [{
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
        category: CategoryResolver
    }
}];
