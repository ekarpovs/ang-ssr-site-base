import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UniqueId } from '~/app/framework/ngrx';

import { User } from './user.model';
export const USER = 'user--user';

export interface State extends EntityState<User> {
  selectedId: UniqueId;
  isProcessing?: boolean;
  error?: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: cur => cur._id
});

export const initialState: State = adapter.getInitialState({
  selectedId: undefined,
  isProcessing: false,
  error: undefined
});
