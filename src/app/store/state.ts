import { FrameworkState } from '~/app/framework/store';

import { UserState } from './user';

export interface State extends FrameworkState {
  usr: UserState;
}
