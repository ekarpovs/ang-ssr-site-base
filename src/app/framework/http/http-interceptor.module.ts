import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule, PLATFORM_ID } from '@angular/core';

import { AuthInterceptor } from './auth-interceptor';
import { BaseApiUrlInterceptor } from './base-api-url.interceptor';
import { BaseAuthUrlInterceptor } from './base-auth-url.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { TimeoutInterceptor } from './time-out.interceptor';
import { UniversalInterceptor } from './universal.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseApiUrlInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseAuthUrlInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeoutInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    }
  ]
})
export class HttpInterceptorModule {}
