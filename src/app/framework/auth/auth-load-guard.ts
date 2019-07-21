import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import * as fromState from '../store/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthLoadGuard implements CanLoad {
  constructor(
    readonly router: Router,
    readonly store$: Store<any>
  ) { }

  canLoad(route: Route, segments: Array<UrlSegment>): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkStoreAuthentication()
    .pipe(
      map((authed) => {
          if (!authed) {
              this.store$.dispatch(fromState.authActions.authNavigateToLogin({
                router: this.router
              }));

              return false;
          }

          return true;
      }),
      first()
    );
  }

  /**
   * Determine if the user is logged by checking the Redux store.
   */
  private checkStoreAuthentication(): Observable<boolean> {
    return this.store$.pipe(select(fromState.AuthSelectors.getToken)).pipe(first());
  }
}
