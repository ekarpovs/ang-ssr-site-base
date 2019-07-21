import { MetaGuard } from '@ngx-meta/core';
import { AuthActivateGuard } from '~/app/framework/auth/auth-activate-guard';
import { AuthLoadGuard } from '~/app/framework/auth/auth-load-guard';
import { ChangeLanguageComponent } from '~/app/framework/i18n';
import { MainComponent } from '~/app/layout/main.component';

import { appRoutePaths } from './app.routes.paths';

export const routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: appRoutePaths.login,
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: appRoutePaths.home,
        loadChildren: './+home/home.module#HomeModule'
      },
      {
        path: appRoutePaths.about,
        loadChildren: './+about/about.module#AboutModule'
      },
      {
        path: appRoutePaths.users,
        loadChildren: './+user/user.module#UserModule',
        canLoad: [AuthLoadGuard],
        canActivate: [AuthActivateGuard],
      }
    ],
    canActivateChild: [MetaGuard],
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
    path: appRoutePaths.change_language,
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
