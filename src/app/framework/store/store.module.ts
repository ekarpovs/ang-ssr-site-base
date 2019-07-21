import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthStoreModule } from './auth';
import { I18NStoreModule } from './i18n';
import { RtrStoreModule } from './rtr';

@NgModule({
  imports: [CommonModule, I18NStoreModule, AuthStoreModule, RtrStoreModule]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: StoreModule) {
    if (parentModule) {
      throw new Error('StoreFrameworkModule already loaded. Import in root module only.');
    }
  }
}
