import {Routes} from '@angular/router';
import {EditComponent} from '@modules/devices/components/edit/edit.component';
import {DetailsComponent} from '@modules/devices/components/details/details.component';
import {DeviceResolver} from '@modules/devices/resolvers/devices.resolver';
import {ListComponent} from '@modules/devices/components/list/list.component';

export const DevicesRoutes: Routes = [{
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
        device: DeviceResolver
    }
}, {
    path: ':id',
    component: DetailsComponent,
    resolve: {
        device: DeviceResolver
    }
}];
