import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoticesRoutes } from '@modules/notices/notices.routes';
import { ListComponent } from '@modules/notices/components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersComponent } from './components/list/filters/filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@modules/shared/shared.module';
import { NoticesService } from '@modules/notices/notices.service';
import { FeedsComponent } from './components/feeds/feeds.component';
import { EditComponent } from './components/edit/edit.component';
import { EveryUPModule } from '@everyup/everyup.module';
import { NoticeResolver } from '@modules/notices/resolvers/notice.resolver';
import { FeedsFiltersComponent } from '@modules/notices/components/feeds/filters/filters.component';


@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(NoticesRoutes),
        TranslateModule,
        SharedModule,
        EveryUPModule,
    ],
    providers: [
        NoticesService,
        NoticeResolver
    ],
    declarations: [
        ListComponent,
        FiltersComponent,
        FeedsComponent,
        EditComponent,
        FiltersComponent,
        FeedsFiltersComponent
    ]
})
export class NoticesModule {

}
