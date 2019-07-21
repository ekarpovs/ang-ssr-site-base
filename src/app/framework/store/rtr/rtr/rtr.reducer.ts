import { errorFn, startProcessingFn, stopProcessingFn } from '~/app/framework/ngrx';

import { initialState, State } from '../rtr.state';

import { RtrAction, rtrActions } from './rtr.actions';


// NOTE: for AoT compilation
// tslint:disable-next-line
export function reducer(state: State = initialState, action: RtrAction): State {
    return rtrActions.match({
        rtrGo: () => startProcessingFn<State>(state),
        rtrGoSuccess: (response: string) => ({
          ...stopProcessingFn<State>(state),
        }),
        rtrGoFail: errorFn<State>(state),

        default: () => state
      })(action);
    }

export const getError = (state: State) => state.error;
export const getisProcessing = (state: State) => state.isProcessing;
