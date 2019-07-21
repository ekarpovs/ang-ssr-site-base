import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { get } from 'lodash/fp';
import { of as observableOf } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { rtrActions } from './rtr.actions';


@Injectable()
export class RtrEffects {
  @Effect() navigateTo$ = this.actions$.pipe(
    filter(rtrActions.is.rtrGo),
    map(get('payload')),
    map(payload => {
      observableOf(payload.router.navigate(payload.route));

        return rtrActions.rtrGoSuccess('success');
    })
  );

  constructor(private readonly actions$: Actions) {
  }
}

