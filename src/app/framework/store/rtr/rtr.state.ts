export const RTR = 'rtr--rtr';

export interface State {
  isProcessing: boolean;
  error: string | null;
}

export const initialState: State = {
  isProcessing: false,
  error: ''
};
