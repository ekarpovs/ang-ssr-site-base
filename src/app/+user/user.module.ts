import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '~/app/framework/material';
import { SharedModule } from '~/app/shared';
import { CardModule } from '~/app/shared/card/card.module';
import { DataTableModule } from '~/app/shared/data-table';

import { routes } from './user.routes';
import { UserDetailContainerComponent } from './user/user-detail/user-detail-container.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserValidationService } from './user/user-detail/user-validation.service';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MaterialModule, CardModule, DataTableModule, SharedModule],
  declarations: [UserDetailContainerComponent, UserDetailComponent, UserComponent],
  providers: [UserValidationService]
})
export class UserModule {}
