import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgProgressModule} from '@ngx-progressbar/core';
import {TranslateModule} from '@ngx-translate/core';
import {ResponsiveModule} from 'ngx-responsive';
import {StoreModule} from '@ngrx/store';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {EveryUPModule} from '@everyup/everyup.module';

import {AppComponent} from '@everywan/app.component';
import {ApplicationRoutes} from '@everywan/app.routes';
import {ApiModule} from '@modules/network/api.module';
import {TranslationModule} from '@everywan/modules/translations/translation.module';
import {NotificationsModule} from '@modules/notifications/notifications.module';
import {HeaderComponent} from '@everywan/components/header/header.component';
import {FooterComponent} from '@everywan/components/footer/footer.component';
import {IndexComponent} from '@everywan/components/index/index.component';
import {MenuComponent as MenuDesktopComponent} from '@everywan/components/menu/desktop/menu.component';
import {MenuComponent as MenuMobileComponent} from '@everywan/components/menu/mobile/menu.component';
import {ApplicationReducers} from '@services/store/store.reducers';
import {StorageService} from '@services/storage/storage.service';
import {TitleService} from '@services/title.service';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        FooterComponent,
        MenuDesktopComponent,
        MenuMobileComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        NgProgressModule,
        EveryUPModule,
        ApiModule,
        TranslateModule,
        TranslationModule.forRoot(),
        ResponsiveModule.forRoot(),
        NotificationsModule.forRoot(),
        AngularSvgIconModule.forRoot(),
        StoreModule.forRoot(ApplicationReducers),
        RouterModule.forRoot(ApplicationRoutes)
    ],
    providers: [
        StorageService,
        TitleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
