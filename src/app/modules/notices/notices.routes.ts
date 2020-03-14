import { Routes } from '@angular/router';

import { ListComponent } from '@modules/notices/components/list/list.component';
import { FeedsComponent } from '@modules/notices/components/feeds/feeds.component';
import { EditComponent } from '@modules/notices/components/edit/edit.component';
import { NoticeResolver } from '@modules/notices/resolvers/notice.resolver';

export const NoticesRoutes: Routes = [{
   path: '',
   pathMatch: 'full',
   component: ListComponent
}, {
    path: ':id/feeds',
    component: FeedsComponent,
    resolve: {
        notice: NoticeResolver
    }
}, {
    path: 'create',
    component: EditComponent,
    data: {
        mode: 'create'
    }
}, {
    path: ':id/details',
    component: EditComponent,
    data: {
        mode: 'details'
    },
    resolve: {
        notice: NoticeResolver
    }
}];
