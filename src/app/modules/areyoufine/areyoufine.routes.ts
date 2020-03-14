import { Routes } from '@angular/router';

import { ListComponent } from '@modules/areyoufine/components/list/list.component';
import { FeedsComponent } from '@modules/areyoufine/components/feeds/feeds.component';
import { AreYouFineResolver } from '@modules/areyoufine/resolvers/areyoufine.resolver';

export const AreyoufineRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: ':id/feeds',
    component: FeedsComponent,
    resolve: {
        inquiry: AreYouFineResolver
    }
}];
