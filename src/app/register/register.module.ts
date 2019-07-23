import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '~/app/framework/material';
import { SharedModule } from '~/app/shared';

import { RegisterContainerComponent } from './register-container.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RegisterRoutingModule,
];

const COMPONENTS: any = [
    RegisterContainerComponent,
    RegisterComponent
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class RegisterModule {
}
