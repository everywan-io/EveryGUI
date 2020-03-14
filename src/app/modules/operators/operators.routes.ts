import {Routes} from '@angular/router';
import {EditComponent} from '@modules/operators/components/edit/edit.component';
import {OperatorResolver} from '@modules/operators/resolvers/operator.resolver';
import {ListComponent} from '@modules/operators/components/list/list.component';
import { DetailsComponent } from '@modules/operators/components/details/details.component';

export const OperatorsRoutes: Routes = [{
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
        operator: OperatorResolver
    }
}, {
    path: ':id/details',
    component: DetailsComponent,
    resolve: {
        operator: OperatorResolver
    }
}];
