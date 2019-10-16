import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { UniqueId } from '~/app/framework/ngrx';

import { User } from './user.model';

export const userActions = unionize(
  {
    getMany: {},
    getManySuccess: ofType<Array<User>>(),
    getManyFail: ofType<string>(),
    getOne: ofType<UniqueId>(),
    getOneSuccess: ofType<User>(),
    getOneFail: ofType<string>(),
    addOne: {},
    createOne: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    createOneSuccess: ofType<User>(),
    createOneFail: ofType<{ id: UniqueId; error: string }>(),
    updateOne: ofType<{ resource: User; router: Router; route: Array<string> }>(),
    updateOneSuccess: ofType<User>(),
    updateOneFail: ofType<{ id: UniqueId; error: string }>(),
    deleteOne: ofType<{ id: UniqueId; router: Router; route: Array<string> }>(),
    deleteOneSuccess: ofType<UniqueId>(),
    deleteOneFail: ofType<{ id: UniqueId; error: string }>()
  },
  {
    tag: 'type',
    value: 'payload'
  }
);
export type UserAction = UnionOf<typeof userActions>;
