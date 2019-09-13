import { RenderFlag } from '~/app/shared';

import { userRoutePaths } from './user.routes.path';
import { UserDetailContainerComponent } from './user/user-detail/user-detail-container.component';
import { UserComponent } from './user/user.component';

export const routes = [
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
    path: userRoutePaths.create,
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
    path: `${userRoutePaths.edit}/${userRoutePaths.item}`,
    component: UserDetailContainerComponent,
    data: {
      renderFlag: RenderFlag.Update,
      meta: {
        title: 'PUBLIC.USER.USER.USER_DETAIL.PAGE_TITLE',
        description: 'PUBLIC.USER.META_DESCRIPTION'
      }
    }
  },
  {
    path: `${userRoutePaths.delete}/${userRoutePaths.item}`,
    component: UserDetailContainerComponent,
    data: {
      renderFlag: RenderFlag.Delete,
      meta: {
        title: 'PUBLIC.USER.USER.USER_DETAIL.PAGE_TITLE',
        description: 'PUBLIC.USER.META_DESCRIPTION'
      }
    }
  }
];
