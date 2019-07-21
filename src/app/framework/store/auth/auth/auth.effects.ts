import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { flow, get, isEmpty, isNil, negate } from 'lodash/fp';
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { appRoutePaths } from '~/app/app.routes.paths';
import { AuthService } from '~/app/framework/auth/auth.service';
import { ERROR__NO_PAYLOAD } from '~/app/shared/constants';

import { authActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  /**
   * Attempt to login.
   */
  @Effect() login$ = this.actions$.pipe(
    filter(authActions.is.authLogin),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
      ? this.auth.login$(payload.resource).pipe(
          map(authActions.authLoginSuccess),
          tap(async () => payload.router.navigate(payload.route)),
          catchError(error =>
            observableOf(
              authActions.authLoginFail(
                error.message
              )
            )
          )
        )
      : observableOf(
        authActions.authLoginFail(
              ERROR__NO_PAYLOAD.message
        )
      )
    )
  );

  @Effect() logout$ = this.actions$.pipe(
    filter(authActions.is.authLogout),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
      ? this.auth.logout$().pipe(
          map(authActions.authLogoutSuccess),
          tap(async () => payload.router.navigate(payload.route)),
          catchError(error =>
            observableOf(
              authActions.authLogoutFail(
                error.message
              )
            )
          )
        )
      : observableOf(
        authActions.authLogoutFail(
              ERROR__NO_PAYLOAD.message
          )
        )
      )
  );

  @Effect() navigateTo$ = this.actions$.pipe(
    filter(authActions.is.authNavigateToLogin),
    map(get('payload')),
    map(payload => {
      observableOf(payload.router.navigate([appRoutePaths.login]));

        return authActions.authNavigateToLoginSuccess('success');
    })
  );

  constructor(private readonly actions$: Actions, private readonly auth: AuthService) {
  }
}

