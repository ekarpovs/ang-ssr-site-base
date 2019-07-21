import { BaseDocument } from '~/app/framework/ngrx';

export interface User extends BaseDocument {
  name: string;
}
