import {Routes} from '@angular/router';

import {IndexComponent} from '@everywan/components/index/index.component';
import {LoggedUserGuard} from '@modules/shared/guards/logged.user.guard';
import {MenuComponent} from '@everywan/components/menu/mobile/menu.component';
import {MobileGuard} from '@modules/shared/guards/mobile.guards';

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
        redirectTo: 'audit'
    },
        {
        path: 'audit',
        loadChildren: '@everywan/modules/audit/audit.module#AuditModule'
    }, {
        path: 'operators',
        loadChildren: '@everywan/modules/operators/operators.module#OperatorsModule'
    }, {
        path: 'users',
        loadChildren: '@everywan/modules/users/users.module#UsersModule'
    }, {
        path: 'devices',
        loadChildren: '@everywan/modules/devices/devices.module#DevicesModule'
    }, {
        path: 'groups',
        loadChildren: '@everywan/modules/usergroups/usergroups.module#UsergroupsModule'
    }, {
        path: 'notices',
        loadChildren: '@everywan/modules/notices/notices.module#NoticesModule'
    }, {
        path: 'areyoufine',
        loadChildren: '@everywan/modules/areyoufine/areyoufine.module#AreyoufineModule'
    }, {
        path: 'geoclaim',
        loadChildren: '@everywan/modules/geoclaim/geoclaim.module#GeoclaimModule'
    }, {
        path: 'categories',
        loadChildren: '@everywan/modules/categories/categories.module#CategoriesModule'
    }, {
        path: 'userslocation',
        loadChildren: '@everywan/modules/userslocation/userslocation.module#UserslocationModule'
    }, {
        path: 'signals',
        loadChildren: '@everywan/modules/signals/signals.module#SignalsModule'
    }, {
        path: 'settings',
        component: MenuComponent,
        canActivate: [MobileGuard]
    }]
}];
