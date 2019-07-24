import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '~/app/framework/auth/models/auth.model';

export const authActions = unionize(
    {
        authLogin: ofType<{ resource: LoginCredentials; router: Router; route: Array<string> }>(),
        authLoginSuccess: ofType<AuthResponse>(),
        authLoginFail: ofType<string>(),
        authLogout: ofType<{ resource: string; router: Router; route: Array<string> }>(),
        authLogoutSuccess: ofType<AuthResponse>(),
        authLogoutFail: ofType<string>(),
        authRegister: ofType<{ resource: RegisterCredentials; router: Router; route: Array<string> }>(),
        authRegisterSuccess: ofType<AuthResponse>(),
        authRegisterFail: ofType<string>(),
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
  

