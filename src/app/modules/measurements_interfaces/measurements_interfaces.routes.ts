import { Routes } from '@angular/router';
import { EditComponent } from '@modules/measurements_interfaces/components/edit/edit.component';
import { DetailsComponent } from '@modules/measurements_interfaces/components/details/details.component';
import { MeasurementResolver } from './resolvers/measurements_interfaces.resolver';
import { ResultsResolver } from './resolvers/results.resolver';
import { DetailsResolver } from './resolvers/details.resolver';
import { ListComponent } from '@modules/measurements_interfaces/components/list/list.component';
import { ResultsComponent } from '@modules/measurements_interfaces/components/results/results.component';

export const MeasurementsRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent
}, {
    path: ':sessionId',
    component: ListComponent,
    resolve: {
        measurement: MeasurementResolver
    }
}, {
    path: ':sessionId/details',
    component: DetailsComponent,
    resolve: {
        measurement: DetailsResolver
    }
}, {
    path: ':sessionId/results',
    component: ResultsComponent,
    resolve: {
        measurement: ResultsResolver
    }
}];
