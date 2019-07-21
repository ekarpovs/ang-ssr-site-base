import { createFeatureSelector, createSelector } from '@ngrx/store';
import { get, isNil } from 'lodash/fp';

import { adapter, State, USER } from './user.state';

const getState = createFeatureSelector<State>(USER);
const { selectAll } = adapter.getSelectors(getState);

export const getIsProcessing = createSelector(
  getState,
  state => get('isProcessing')(state) || false
);
export const getError = createSelector(
  getState,
  state => get('error')(state)
);

export const getSelectedId = createSelector(
  getState,
  state => get('selectedId')(state)
);
export const getSelected = createSelector(
  get(`${USER}.entities`),
  getSelectedId,
  (entities, id) => !isNil(id) && entities[id]
);

export { selectAll as getMany };
