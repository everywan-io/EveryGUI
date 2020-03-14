import { Routes } from '@angular/router';
import { ListComponent } from '@modules/users/components/list/list.component';
import { EditComponent } from '@modules/users/components/edit/edit.component';
import { UserResolver } from '@modules/users/resolvers/user.resolver';
import { DetailsComponent } from '@modules/users/components/details/details.component';


export const UsersRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: ':id/edit',
    component: EditComponent,
    data: {
        mode: 'edit'
    },
    resolve: {
        user: UserResolver
    }
}, {
    path: ':id/details',
    component: DetailsComponent,
    resolve: {
        user: UserResolver
    }
}];
