import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';
import { appRoutePaths } from '~/app/app.routes.paths';
import { BaseComponent } from '~/app/framework/core';
import { authActions } from '~/app/framework/store/auth/auth/auth.actions';
import { AuthSelectors, Language, LanguageSelectors, State } from '~/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
  // TODO: maintain immutability
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends BaseComponent implements OnInit {
  title: string;
  baseRoute: Array<string>;
  currentLanguage$: Observable<Language>;
  availableLanguages: Array<Language>;
  isAuthenticated = false; // TODO: access only through getter
  private token = '';

  constructor(
    private readonly store$: Store<State>,
    private readonly config: ConfigService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = 'APP_NAME';
    this.baseRoute = ['/', appRoutePaths.home];
    this.currentLanguage$ = this.store$.pipe(select(LanguageSelectors.getWorkingLanguage));
    this.availableLanguages = this.config.getSettings('i18n.availableLanguages');
    this.store$.pipe(select(AuthSelectors.getToken))
    .subscribe((token: string) => {
      this.token = token;
      this.isAuthenticated = token ? true : false; 
    });
  }
  logout(): void {
    this.store$.dispatch(authActions.authLogout({
      resource: this.token,
      router: this.router,
      route: this.baseRoute
    }));
  }
}
