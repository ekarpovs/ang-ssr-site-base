import { AuthResponse } from '~/app/framework/auth/models/auth.model';
import { errorFn, startProcessingFn, stopProcessingFn } from '~/app/framework/ngrx';

import { initialState, State } from '../auth.state';

import { AuthAction, authActions } from './auth.actions';


// NOTE: for AoT compilation
// tslint:disable-next-line
export function reducer(state: State = initialState, action: AuthAction): State {
    return authActions.match({
        authLogin: () => startProcessingFn<State>(state),
        authLoginSuccess: (response: AuthResponse) => ({
          ...stopProcessingFn<State>(state),
          token: response.idToken
        }),
        authLoginFail: errorFn<State>(state),

        authLogout: () => startProcessingFn<State>(state),
        authLogoutSuccess: (response: AuthResponse) => ({
          ...stopProcessingFn<State>(state),
          token: response.idToken
        }),
        authLogoutFail: errorFn<State>(state),

        authRegister: () => startProcessingFn<State>(state),
        authRegisterSuccess: (response: AuthResponse) => ({
          ...stopProcessingFn<State>(state),
          token: response.idToken
        }),
        authRegisterFail: errorFn<State>(state),

        authNavigateToLogin: () => startProcessingFn<State>(state),
        authNavigateToLoginSuccess: (response: string) => ({
          ...stopProcessingFn<State>(state),
        }),
        authNavigateToLoginFail: errorFn<State>(state),

        default: () => state
      })(action);
    }

export const getToken = (state: State) => state.token;
export const getIsLoggedIn = (state: State) => ((state.token !== '') && (state.token !== undefined) && (state.token !== null));
export const getError = (state: State) => state.error;
export const getisProcessing = (state: State) => state.isProcessing;
