import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AUTH } from './auth.state';
import { AuthEffects } from './auth/auth.effects';
import * as fromAuth from './auth/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {}
