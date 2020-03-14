import { Routes } from '@angular/router';
import { AuditViewComponent } from '@modules/audit/components/view/view.component';
import { AuditResolver } from '@modules/audit/resolvers/audit.resolver';

export const AuditRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AuditViewComponent,
        resolve: {
            audit: AuditResolver
        }
    }
];
