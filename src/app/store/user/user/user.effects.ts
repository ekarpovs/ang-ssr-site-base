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
  @Effect() usrGetMany$ = this.actions$.pipe(
    filter(userActions.is.usrGetMany),
    withLatestFrom(this.store$.pipe(select(getMany))),
    switchMap(([,users]) => {
      if(users.length !== 0) { 
        return observableOf(users).pipe(map(userActions.usrGetManySuccess))
      }
      
      return this.user.getMany$().pipe(
        map(userActions.usrGetManySuccess),
        catchError(error => observableOf(userActions.usrGetManyFail(error.error)))
      )
    })
  );

  @Effect() usrGetOne$ = this.actions$.pipe(
    filter(userActions.is.usrGetOne),
    map(get('payload')),
    switchMap(payload =>
      !isEmpty(payload)
        ? this.user.getOne$(payload).pipe(
            map(userActions.usrGetOneSuccess),
            catchError(error => observableOf(userActions.usrGetOneFail(error.message)))
          )
        : observableOf(userActions.usrGetOneFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() usrCreateOne$ = this.actions$.pipe(
    filter(userActions.is.usrCreateOne),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
        ? this.user.createOne$(payload.resource).pipe(
            map(userActions.usrCreateOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrCreateOneFail({
                  id: EMPTY_UNIQUE_ID,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrCreateOneFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() usrUpdateOne$ = this.actions$.pipe(
    filter(userActions.is.usrUpdateOne),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('_id'),
        negate(isNil)
      )(payload.resource)
        ? this.user.updateOne$(payload.resource).pipe(
            map(userActions.usrUpdateOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrUpdateOneFail({
                  id: payload.resource._id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrUpdateOneFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() usrDeleteOne$ = this.actions$.pipe(
    filter(userActions.is.usrDeleteOne),
    map(get('payload')),
    switchMap(payload =>
      !isNil(payload.id)
        ? this.user.deleteOne$(payload.id).pipe(
            map(userActions.usrDeleteOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.usrDeleteOneFail({
                  id: payload.id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.usrDeleteOneFail({
              id: payload.id,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  constructor(protected store$: Store<State>, private readonly actions$: Actions, private readonly user: UserService) {}
}
