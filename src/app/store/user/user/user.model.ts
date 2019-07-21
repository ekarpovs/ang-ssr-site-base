import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';
import { User } from '~/app/library/admin/models/user';

export { User };

export const initialUser: User = {
  _id: EMPTY_UNIQUE_ID,
  name: ''
};
