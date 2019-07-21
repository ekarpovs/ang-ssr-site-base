import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { flow, getOr } from 'lodash/fp';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const getBaseAuthUrl = (config: ConfigService) => () =>
  flow(
    (cur: ConfigService) => cur.getSettings(''),
    getOr('')('backend.baseAuthUrl')
  )(config);

@Injectable()
export class BaseAuthUrlInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, @Inject(PLATFORM_ID) private readonly platformId: any) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer: any) => {
      const item = this.injector.get(ConfigService);
      observer.next(item);
      observer.complete();
    }).pipe(
      mergeMap((res: ConfigService) => {
        const intercepted = flow(
          isPlatformServer,
          getBaseAuthUrl(res),
          cur => request.url.replace('{baseAuthUrl}', cur),
          url => request.clone({ url })
        )(this.platformId);

        return next.handle(intercepted);
      })
    );
  }
}
