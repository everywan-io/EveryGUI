import { Routes } from '@angular/router';
import { EditComponent } from '@modules/overlaynets/components/edit/edit.component';
import { OverlayNetResolver } from '@modules/overlaynets/resolvers/overlaynets.resolver';
import { DeviceAvailableResolver } from '@modules/overlaynets/resolvers/devices.resolver';
import { InterfaceAvailableResolver } from '@modules/overlaynets/resolvers/interfaces.resolver';
import { ListComponent } from '@modules/overlaynets/components/list/list.component';

export const OverlayNetsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: 'create',
    component: EditComponent,
    data: {
        mode: 'create'
    },
    resolve: {
        //devices: DeviceAvailableResolver,
        interfaces: InterfaceAvailableResolver
    }
}, {
    path: ':id/configure',
    component: EditComponent,
    data: {
        mode: 'configure'
    },
    resolve: {
        overlaynet: OverlayNetResolver,
        devices: DeviceAvailableResolver,
        interfaces: InterfaceAvailableResolver
    }
}
];
