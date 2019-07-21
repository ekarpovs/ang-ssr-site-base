export const AUTH = 'auth--auth';

export interface State {
  token: string | null;
  isProcessing: boolean;
  error: string | null;
}

export const initialState: State = {
  token: '',
  isProcessing: false,
  error: ''
};
