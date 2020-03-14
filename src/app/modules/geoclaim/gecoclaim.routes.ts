import { Routes } from '@angular/router';

import { ListComponent } from '@modules/geoclaim/components/list/list.component';
import { FeedsComponent } from '@modules/geoclaim/components/feeds/feeds.component';
import { GeoclaimResolver } from '@modules/geoclaim/resolvers/geoclaim.resolver';


export const GeoClaimRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: ':id/feeds',
    component: FeedsComponent,
    resolve: {
        inquiry: GeoclaimResolver
    }
}];
