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
    filter(userActions.is.getMany),
    withLatestFrom(this.store$.pipe(select(getMany))),
    switchMap(([,users]) => {
      if(users.length !== 0) { 
        return observableOf(users).pipe(map(userActions.getManySuccess))
      }
      
      return this.user.getMany$().pipe(
        map(userActions.getManySuccess),
        catchError(error => observableOf(userActions.getManyFail(error.error)))
      )
    })
  );

  @Effect() getOne$ = this.actions$.pipe(
    filter(userActions.is.getOne),
    map(get('payload')),
    switchMap(payload =>
      !isEmpty(payload)
        ? this.user.getOne$(payload).pipe(
            map(userActions.getOneSuccess),
            catchError(error => observableOf(userActions.getOneFail(error.message)))
          )
        : observableOf(userActions.getOneFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() createOne$ = this.actions$.pipe(
    filter(userActions.is.createOne),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
        ? this.user.createOne$(payload.resource).pipe(
            map(userActions.createOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.createOneFail({
                  id: EMPTY_UNIQUE_ID,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.createOneFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() updateOne$ = this.actions$.pipe(
    filter(userActions.is.updateOne),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('_id'),
        negate(isNil)
      )(payload.resource)
        ? this.user.updateOne$(payload.resource).pipe(
            map(userActions.updateOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.updateOneFail({
                  id: payload.resource._id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.updateOneFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() deleteOne$ = this.actions$.pipe(
    filter(userActions.is.deleteOne),
    map(get('payload')),
    switchMap(payload =>
      !isNil(payload.id)
        ? this.user.deleteOne$(payload.id).pipe(
            map(userActions.deleteOneSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                userActions.deleteOneFail({
                  id: payload.id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
          userActions.deleteOneFail({
              id: payload.id,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  constructor(protected store$: Store<State>, private readonly actions$: Actions, private readonly user: UserService) {}
}
