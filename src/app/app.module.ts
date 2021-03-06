import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ConfigLoader, ConfigService } from '@ngx-config/core';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from '~/app/app.component';
import { routes } from '~/app/app.routes';
import { AnalyticsModule } from '~/app/framework/analytics';
import { AuthActivateGuard } from '~/app/framework/auth/auth-activate-guard';
import { AuthLoadGuard } from '~/app/framework/auth/auth-load-guard';
import { AuthService } from '~/app/framework/auth/auth.service';
import { configFactory, CoreModule, metaFactory, SharedModule } from '~/app/framework/core';
import { HttpInterceptorModule } from '~/app/framework/http';
import { ChangeLanguageComponent, I18NModule, translateFactory } from '~/app/framework/i18n';
import { MaterialModule } from '~/app/framework/material';
import { FooterComponent } from '~/app/layout/footer.component';
import { HeaderComponent } from '~/app/layout/header.component';
import { MainComponent } from '~/app/layout/main.component';
import { StoreModule } from '~/app/store';

export const REQ_KEY = makeStateKey<string>('req');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true };

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app-id' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(routes),
    PerfectScrollbarModule,
    AnalyticsModule.forRoot([
      {
        provide: ANGULARTICS2_TOKEN,
        useValue: {
          providers: [Angulartics2GoogleAnalytics],
          settings: {}
        }
      }
    ]),
    CoreModule.forRoot([
      {
        provide: ConfigLoader,
        useFactory: configFactory,
        deps: [Injector]
      },
      {
        provide: MetaLoader,
        useFactory: metaFactory,
        deps: [ConfigService, TranslateService]
      }
    ]),
    SharedModule,
    HttpInterceptorModule,
    I18NModule.forRoot([
      {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    ]),
    MaterialModule,
    StoreModule.forRoot()
  ],
  declarations: [AppComponent, HeaderComponent, MainComponent, FooterComponent ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AuthService,
    AuthLoadGuard,
    AuthActivateGuard
  ],
  exports: [AppComponent],
  entryComponents: [ChangeLanguageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
