import { RenderFlag } from '~/app/shared';

import { UserDetailContainerComponent } from './user/user-detail/user-detail-container.component';
import { UserComponent } from './user/user.component';

export const routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserComponent,
            data: {
              meta: {
                title: 'PUBLIC.USER.USER.PAGE_TITLE',
                description: 'PUBLIC.USER.META_DESCRIPTION'
              }
            }
          },
          {
            path: 'create',
            component: UserDetailContainerComponent,
            data: {
              renderFlag: RenderFlag.Create,
              meta: {
                title: 'PUBLIC.USER.USER.USER_DETAIL.PAGE_TITLE',
                description: 'PUBLIC.USER.META_DESCRIPTION'
              }
            }
          },
          {
            path: ':id',
            component: UserDetailContainerComponent,
            data: {
              renderFlag: RenderFlag.Update,
              meta: {
                title: 'PUBLIC.USER.USER.USER_DETAIL.PAGE_TITLE',
                description: 'PUBLIC.USER.META_DESCRIPTION'
              }
            }
          }
        ]
      }
    ]
  }
];
