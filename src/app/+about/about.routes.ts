import { AboutUsComponent } from './about-us.component';
import { AboutComponent } from './about.component';

export const routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'us/:topicId',
    component: AboutUsComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT_US.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT_US.META_DESCRIPTION'
      }
    }
  }
];
