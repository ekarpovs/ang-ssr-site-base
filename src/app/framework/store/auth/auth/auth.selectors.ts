import { createFeatureSelector, createSelector } from '@ngrx/store';
import { get } from 'lodash/fp';

import { AUTH, State } from '../auth.state';

const getState = createFeatureSelector<State>(AUTH);

export const getIsProcessing = createSelector(
  getState,
  state => get('isProcessing')(state) || false
);
export const getError = createSelector(
  getState,
  state => get('error')(state)
);
export const getToken = createSelector(
  getState,
  state => get('token')(state)
);

export const getExpired = createSelector(
  getState,
  state => get('expired')(state)
);

export const getUser = createSelector(
  getState,
  state => get('user')(state)
);
