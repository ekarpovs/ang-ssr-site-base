import { BaseDocument } from '~/app/framework/ngrx';

export interface User extends BaseDocument {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
}
