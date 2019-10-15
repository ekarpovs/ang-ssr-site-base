import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { flow, get, isEmpty, isNil, negate } from 'lodash/fp';
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';
import { ERROR__NO_PAYLOAD } from '~/app/shared';

import { userActions } from './user.actions';
import { getMany } from './user.selectors';
import { UserService } from './user.service';
import { State } from './user.state';

@Injectable()
export class UserEffects {
  @Effect() getMany$ = this.actions$.pipe(
    filter(userActions.is.usrGetManyUsers),
    withLatestFrom(this.store$.pipe(select(getMany))),
    switchMap(([,users]) => {
      if(users.length !== 0) { 
        return observableOf(users).pipe(map(userActions.usrGetManyUsersSuccess))
      }
      
      return this.user.getMany$().pipe(
        map(userActions.usrGetManyUsersSuccess),
        catchError(error => observableOf(userActions.usrGetManyUsersFail(error.error)))
      )
    })
  );

  @Effect() getOne$ = this.actions$.pipe(
    filter(userActions.is.usrGetOneUser),
    map(get('payload')),
    switchMap(payload =>
      !isEmpty(payload)
        ? this.user.getOne$(payload).pipe(
            map(userActions.usrGetOneUserSuccess),
            catchError(error => observableOf(userActions.usrGetOneUserFail(error.message)))
          )
        : observableOf(userActions.usrGetOneUserFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() createOne$ = this.actions$.pipe(
    filter(userActions.is.usrCreateOneUser),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
        ? this.user.createOne$(payload.resource).pipe(
            map(userActions.usrCreateOneUserSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrCreateOneUserFail({
                  id: EMPTY_UNIQUE_ID,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrCreateOneUserFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() updateOne$ = this.actions$.pipe(
    filter(userActions.is.usrUpdateOneUser),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('_id'),
        negate(isNil)
      )(payload.resource)
        ? this.user.updateOne$(payload.resource).pipe(
            map(userActions.usrUpdateOneUserSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrUpdateOneUserFail({
                  id: payload.resource._id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrUpdateOneUserFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() deleteOne$ = this.actions$.pipe(
    filter(userActions.is.usrDeleteOneUser),
    map(get('payload')),
    switchMap(payload =>
      !isNil(payload.id)
        ? this.user.deleteOne$(payload.id).pipe(
            map(userActions.usrDeleteOneUserSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrDeleteOneUserFail({
                  id: payload.id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrDeleteOneUserFail({
              id: payload.id,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  constructor(protected store$: Store<State>, private readonly actions$: Actions, private readonly user: UserService) {}
}
