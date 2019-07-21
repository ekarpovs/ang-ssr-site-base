import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { getOr, isNil } from 'lodash/fp';
import { Observable, of as observableOf, zip } from 'rxjs';
import { skipWhile, switchMap, takeUntil } from 'rxjs/operators';
import { BaseContainerComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';
import { RenderFlag, routeAnimation } from '~/app/shared';
import { State, User, userActions, UserSelectors } from '~/app/store';

@Component({
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class UserDetailContainerComponent extends BaseContainerComponent implements OnInit {
  user$: Observable<User>;
  baseRoute: Array<string>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly meta: MetaService,
    protected readonly store$: Store<State>
  ) {
    super(store$);
  }

  ngOnInit(): void {
    this.baseRoute = ['/', 'user', 'users'];

    this.isProcessing$ = this.store$.pipe(select(UserSelectors.getIsProcessing));
    this.error$ = this.store$.pipe(select(UserSelectors.getError));
    this.user$ = this.store$.pipe(select(UserSelectors.getSelected));

    this.user$
      .pipe(
        skipWhile(isNil),
        switchMap(res => zip(this.route.data, observableOf(res))),
        switchMap(([data, user]) => zip(this.translate.get(data.meta.title), observableOf(user))),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([title, user]: Array<any>) => {
        const subtitle = getOr('')('name')(user);

        this.meta.setTitle(subtitle ? `${title} - ${subtitle}` : title);
      });

    zip(this.route.data, this.route.params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([data, params]) => {
        if (data.renderFlag === RenderFlag.Create) {
          this.store$.dispatch(userActions.usrAddOneUser());
        } else {
          this.store$.dispatch(userActions.usrGetOneUser(params.id));
        }
      });
  }

  delete(id: UniqueId): void {
    this.store$.dispatch(
      userActions.usrDeleteOneUser({
        id,
        router: this.router,
        route: this.baseRoute
      })
    );
  }

  save(resource: any): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res.renderFlag === RenderFlag.Create) {
        this.store$.dispatch(
          userActions.usrCreateOneUser({
            resource,
            router: this.router,
            route: this.baseRoute
          })
        );
      } else {
        this.store$.dispatch(
          userActions.usrUpdateOneUser({
            resource,
            router: this.router,
            route: this.baseRoute
          })
        );
      }
    });
  }
}
