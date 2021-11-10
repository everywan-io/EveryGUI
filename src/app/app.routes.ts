import { Routes } from '@angular/router';

import { IndexComponent } from '@everywan/components/index/index.component';
import { LoggedUserGuard } from '@modules/shared/guards/logged.user.guard';
import { MenuComponent } from '@everywan/components/menu/mobile/menu.component';
import { MobileGuard } from '@modules/shared/guards/mobile.guards';

export const ApplicationRoutes: Routes = [{
    path: 'auth',
    loadChildren: '@everywan/modules/authentication/authentication.module#AuthenticationModule'
}, {
    path: '',
    component: IndexComponent,
    canActivate: [LoggedUserGuard],
    children: [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadChildren: '@everywan/modules/dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'devices',
        loadChildren: '@everywan/modules/devices/devices.module#DevicesModule'
    }, {
        path: 'overlaynets',
        loadChildren: '@everywan/modules/overlaynets/overlaynets.module#OverlayNetsModule'
    }, {
        path: 'measurementsessions',
        loadChildren: '@everywan/modules/measurements_interfaces/measurements_interfaces.module#MeasurementsModule'
    }, {
        path: 'tenants',
        loadChildren: '@everywan/modules/tenants/tenants.module#TenantsModule'
    }, {
        path: 'settings',
        component: MenuComponent,
        canActivate: [MobileGuard]
    }]
}];
