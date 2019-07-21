import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';

export const rtrActions = unionize(
    {
        rtrGo: ofType<{ router: Router; route: Array<string> }>(),
        rtrGoSuccess: ofType<string>(),
        rtrGoFail: ofType<string>()
        // @TODO:
        // rtrForward: ofType<{ router: Router; route: Array<string> }>(),
        // rtrForwardSuccess: ofType<string>(),
        // rtrForwardFail: ofType<string>(),
        // rtrBack: ofType<{ router: Router; route: Array<string> }>(),
        // rtrBackSuccess: ofType<string>(),
        // rtrBackFail: ofType<string>()
    },
    {
      tag: 'type',
      value: 'payload'
    }
  );
  
  export type RtrAction = UnionOf<typeof rtrActions>;
  

