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
    usrGetMany: () => entityStartProcessingFn<State>(state),
    usrGetManySuccess: (users: Array<User>) => adapter.addAll(users, entityStopProcessingFn<State>(state)),
    usrGetManyFail: entityErrorFn<State>(state),
    
    usrGetOne : () => entityStartProcessingFn<State>(state),
    usrGetOneSuccess: (user: User) =>
      adapter.addOne(user, {
        ...entityStopProcessingFn<State>(state),
        selectedId: user._id
      }),
      usrGetOneFail: entityErrorFn<State>(state),

      usrAddOne : () =>
      adapter.addOne(initialUser, {
        ...entityStopProcessingFn<State>(state),
        selectedId: EMPTY_UNIQUE_ID
      }),

      usrCreateOne: () => entityStartProcessingFn<State>(state),
      usrCreateOneSuccess: (user: User) =>
      adapter.addOne(user, {
          ...entityStopProcessingFn<State>(state),
          selectedId: user._id
        }
      ),
      usrCreateOneFail: entityResetFn<State>(state),
  
      usrUpdateOne: () => entityStartProcessingFn<State>(state),
      usrUpdateOneSuccess: (user: User) =>
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
      usrUpdateOneFail: entityResetFn<State>(state),

      usrDeleteOne: () => entityStartProcessingFn<State>(state),
      usrDeleteOneSuccess: (id: UniqueId) =>
      adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      }),
      usrDeleteOneFail: entityResetFn<State>(state),

    default: () => state
  })(action);
}
