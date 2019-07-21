import { AuthState } from './auth';
import { I18NState } from './i18n';
import { RtrState } from './rtr';

export interface State {
  auth: AuthState;
  i18n: I18NState;
  rtr: RtrState;
}
