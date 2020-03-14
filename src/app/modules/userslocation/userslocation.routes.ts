import { Routes } from '@angular/router';
import { ListComponent } from '@modules/userslocation/components/list/list.component';


export const UserslocationRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}];
