import { NgModule } from '@angular/core';
import { AuditViewComponent } from './components/view/view.component';
import { AuditService } from '@modules/audit/audit.service';
import { AuditResolver } from '@modules/audit/resolvers/audit.resolver';
import { RouterModule } from '@angular/router';
import { AuditRoutes } from '@modules/audit/audit.routes';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild(AuditRoutes),
        TranslateModule,
        CommonModule,
    ],
    providers: [
        AuditService,
        AuditResolver
    ],
    declarations: [
        AuditViewComponent
    ]
})
export class AuditModule {
    
}
