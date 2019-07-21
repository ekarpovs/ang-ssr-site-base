import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import * as fromState from '../store/auth';

// import * as fromState from '../store/auth/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private readonly store$: Store<any>) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const isApiEndpoint: boolean = req.url.toLowerCase().indexOf('/api') > -1;
    const isAuthEndpoint: boolean = req.url.toLowerCase().indexOf('/auth') > -1;

    // NOTE: Only add the auth token to non-Auth REST endpoints.
    if (isApiEndpoint && !isAuthEndpoint) {
        return this.addToken(req).pipe(
            first(),
            mergeMap((requestWithToken: HttpRequest<any>) => next.handle(requestWithToken))
        );
    } else {
        return next.handle(req);
    }
  }

  /**
   * Adds the JWT token to the request's header.
   */
  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    // NOTE: DO NOT try to immediately setup this selector in the constructor or as an assignment in a
    // class member variable as there's no stores available when this interceptor first fires up and
    // as a result it'll throw a runtime error.
    return this.store$.pipe(
      select(fromState.AuthSelectors.getToken),
      first(),
      mergeMap((token: string) => {
        if (token) {
          const cloned = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
            // withCredentials: true
          });

          return of(cloned);
        }
        
        return of(request);
      })
    );
  }
}
