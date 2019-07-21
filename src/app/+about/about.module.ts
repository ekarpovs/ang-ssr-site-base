import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

import { AboutUsComponent } from './about-us.component';
import { AboutComponent } from './about.component';
import { routes } from './about.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule],
  declarations: [AboutComponent, AboutUsComponent]
})
export class AboutModule {}
