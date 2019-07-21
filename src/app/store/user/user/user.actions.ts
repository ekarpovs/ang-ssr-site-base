import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { UniqueId } from '~/app/framework/ngrx';

import { User } from './user.model';

export const userActions = unionize(
  {
    usrGetManyUsers: {},
    usrGetManyUsersSuccess: ofType<Array<User>>(),
    usrGetManyUsersFail: ofType<string>(),
    usrGetOneUser: ofType<UniqueId>(),
    usrGetOneUserSuccess: ofType<User>(),
    usrGetOneUserFail: ofType<string>(),
    usrAddOneUser: {},
    usrCreateOneUser: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    usrCreateOneUserSuccess: ofType<User>(),
    usrCreateOneUserFail: ofType<{ id: UniqueId; error: string }>(),
    usrUpdateOneUser: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    usrUpdateOneUserSuccess: ofType<User>(),
    usrUpdateOneUserFail: ofType<{ id: UniqueId; error: string }>(),
    usrDeleteOneUser: ofType<{ id: UniqueId; router: Router; route: Array<string> }>(),
    usrDeleteOneUserSuccess: ofType<UniqueId>(),
    usrDeleteOneUserFail: ofType<{ id: UniqueId; error: string }>()
  },
  {
    tag: 'type',
    value: 'payload'
  }
);
export type UserAction = UnionOf<typeof userActions>;
