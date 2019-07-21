import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RTR } from './rtr.state';
import { RtrEffects } from './rtr/rtr.effects';
import * as fromRtr from './rtr/rtr.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(RTR, fromRtr.reducer),
    EffectsModule.forFeature([RtrEffects])
  ]
})
export class RtrModule {}
