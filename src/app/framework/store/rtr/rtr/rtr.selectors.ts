import { createFeatureSelector, createSelector } from '@ngrx/store';
import { get } from 'lodash/fp';

import { RTR, State } from '../rtr.state';

const getState = createFeatureSelector<State>(RTR);

export const getIsProcessing = createSelector(
  getState,
  state => get('isProcessing')(state) || false
);
export const getError = createSelector(
  getState,
  state => get('error')(state)
);
