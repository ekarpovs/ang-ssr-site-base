import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { UniqueId } from '~/app/framework/ngrx';

import { User } from './user.model';

export const userActions = unionize(
  {
    usrGetManySuccess: ofType<Array<User>>(),
    usrGetMany: {},
    usrGetManyFail: ofType<string>(),
    usrGetOne: ofType<UniqueId>(),
    usrGetOneSuccess: ofType<User>(),
    usrGetOneFail: ofType<string>(),
    usrAddOne: {},
    usrCreateOne: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    usrCreateOneSuccess: ofType<User>(),
    usrCreateOneFail: ofType<{ id: UniqueId; error: string }>(),
    usrUpdateOne: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    usrUpdateOneSuccess: ofType<User>(),
    usrUpdateOneFail: ofType<{ id: UniqueId; error: string }>(),
    usrDeleteOne: ofType<{ id: UniqueId; router: Router; route: Array<string> }>(),
    usrDeleteOneSuccess: ofType<UniqueId>(),
    usrDeleteOneFail: ofType<{ id: UniqueId; error: string }>()
  },
  {
    tag: 'type',
    value: 'payload'
  }
);
export type UserAction = UnionOf<typeof userActions>;
