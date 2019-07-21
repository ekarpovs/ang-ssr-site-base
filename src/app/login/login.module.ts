import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '~/app/framework/material';
import { SharedModule } from '~/app/shared';

import { LoginContainerComponent } from "./login-container.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    LoginRoutingModule,
];

const COMPONENTS: any = [
    LoginContainerComponent,
    LoginComponent
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class LoginModule {
}
