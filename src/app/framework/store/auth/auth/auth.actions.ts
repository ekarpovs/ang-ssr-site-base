import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { Auth, LoginCredentials } from '~/app/framework/auth/models/auth.model';

export const authActions = unionize(
    {
        authLogin: ofType<{ resource: LoginCredentials; router: Router; route: Array<string> }>(),
        authLoginSuccess: ofType<Auth>(),
        authLoginFail: ofType<string>(),
        authLogout: ofType<{ resource: Auth; router: Router; route: Array<string> }>(),
        authLogoutSuccess: ofType<Auth>(),
        authLogoutFail: ofType<string>(),
        authNavigateToLogin: ofType<{ router: Router;}>(),
        authNavigateToLoginSuccess: ofType<string>(),
        authNavigateToLoginFail: ofType<string>(),
    },
    {
      tag: 'type',
      value: 'payload'
    }
  );
  
  export type AuthAction = UnionOf<typeof authActions>;
  

