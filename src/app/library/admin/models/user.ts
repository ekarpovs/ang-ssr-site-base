import { BaseDocument } from '~/app/framework/ngrx';

export interface User extends BaseDocument {
  email: string;
  password: string;
  username: string;
}
