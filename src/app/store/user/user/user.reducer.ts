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
    usrGetManyUsers: () => entityStartProcessingFn<State>(state),
    usrGetManyUsersSuccess: (users: Array<User>) => adapter.addAll(users, entityStopProcessingFn<State>(state)),
    usrGetManyUsersFail: entityErrorFn<State>(state),
    
    usrGetOneUser : () => entityStartProcessingFn<State>(state),
    usrGetOneUserSuccess: (user: User) =>
      adapter.addOne(user, {
        ...entityStopProcessingFn<State>(state),
        selectedId: user._id
      }),
      usrGetOneUserFail: entityErrorFn<State>(state),

    usrAddOneUser : () =>
      adapter.addOne(initialUser, {
        ...entityStopProcessingFn<State>(state),
        selectedId: EMPTY_UNIQUE_ID
      }),

    usrCreateOneUser: () => entityStartProcessingFn<State>(state),
    usrCreateOneUserSuccess: (user: User) =>
      adapter.updateOne(
        {
          id: EMPTY_UNIQUE_ID,
          changes: user
        },
        {
          ...entityStopProcessingFn<State>(state),
          selectedId: undefined
        }
      ),
    usrCreateOneUserFail: entityResetFn<State>(state),

    usrUpdateOneUser: () => entityStartProcessingFn<State>(state),
    usrUpdateOneUserSuccess: (user: User) =>
      adapter.updateOne(
        {
          id: user._id,
          changes: user
        },
        {
          ...entityStopProcessingFn<State>(state),
          selectedId: undefined
        }
      ),
      usrUpdateOneUserFail: entityResetFn<State>(state),

    usrDeleteOneUser: () => entityStartProcessingFn<State>(state),
    usrDeleteOneUserSuccess: (id: UniqueId) =>
      adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      }),
      usrDeleteOneUserFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
