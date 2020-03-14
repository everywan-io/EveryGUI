import { Routes } from '@angular/router';

import { ListComponent } from '@modules/signals/components/list/list.component';
import { DetailsComponent } from '@modules/signals/components/details/details.component';
import { SignalResolver } from '@modules/signals/resolvers/signal.resolver';
import { ResponseComponent } from '@modules/signals/components/response/response.component';


export const SignalsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: ':id/details',
    component: DetailsComponent,
    resolve: {
        signal: SignalResolver
    }
}, {
    path: ':id/response',
    component: ResponseComponent
}];
