import {
  EMPTY_UNIQUE_ID,
  entityErrorFn,
  entityResetFn,
  entityStartProcessingFn,
  entityStopProcessingFn,
  UniqueId
} from '~/app/framework/ngrx';

import { UserAction, userActions } from './user.actions';
import { initialUser, User } from './user.model';
import { adapter, initialState, State } from './user.state';

// NOTE: for AoT compilation
// tslint:disable-next-line
export function reducer(state: State = initialState, action: UserAction): State {
  return userActions.match({
    getMany: () => entityStartProcessingFn<State>(state),
    getManySuccess: (users: Array<User>) => adapter.addAll(users, entityStopProcessingFn<State>(state)),
    getManyFail: entityErrorFn<State>(state),
    
    getOne : () => entityStartProcessingFn<State>(state),
    getOneSuccess: (user: User) =>
      adapter.addOne(user, {
        ...entityStopProcessingFn<State>(state),
        selectedId: user._id
      }),
      getOneFail: entityErrorFn<State>(state),

      addOne : () =>
      adapter.addOne(initialUser, {
        ...entityStopProcessingFn<State>(state),
        selectedId: EMPTY_UNIQUE_ID
      }),

      createOne: () => entityStartProcessingFn<State>(state),
      createOneSuccess: (user: User) =>
      adapter.addOne(user, {
          ...entityStopProcessingFn<State>(state),
          selectedId: user._id
        }
      ),
      createOneFail: entityResetFn<State>(state),
  
      updateOne: () => entityStartProcessingFn<State>(state),
      updateOneSuccess: (user: User) =>
      adapter.updateOne(
        {
          id: user._id,
          changes: user
        },
        {
          ...entityStopProcessingFn<State>(state),
          selectedId: user._id
        }
      ),
      updateOneFail: entityResetFn<State>(state),

      deleteOne: () => entityStartProcessingFn<State>(state),
      deleteOneSuccess: (id: UniqueId) =>
      adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      }),
      deleteOneFail: entityResetFn<State>(state),

    default: () => state
  })(action);
}
