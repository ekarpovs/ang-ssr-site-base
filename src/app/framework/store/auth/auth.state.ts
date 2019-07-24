import { CurrentUser } from '../../auth/models/auth.model';

export const AUTH = 'auth--auth';

export interface State {
  token: string | null;
  expired: number | null;
  user: CurrentUser;
  isProcessing: boolean;
  error: string | null;
}

export const initialState: State = {
  token: '',
  expired: 0,
  user: {id: '', name: ''},
  isProcessing: false,
  error: ''
};
