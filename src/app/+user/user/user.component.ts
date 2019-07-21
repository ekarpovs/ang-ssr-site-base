import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from as observableFrom, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseContainerComponent } from '~/app/framework/core';
import { routeAnimation, Scrollable } from '~/app/shared';
import { createColumn, createOptions, createRouteButton, DataTable } from '~/app/shared/data-table';
import { State, User, userActions, UserSelectors } from '~/app/store';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class UserComponent extends BaseContainerComponent implements OnInit {
  users$: Observable<Array<User>>;
  baseRoute: Array<any>;
  userTable: DataTable;

  constructor(private readonly router: Router, protected readonly store$: Store<State>) {
    super(store$);
  }

  ngOnInit(): void {
    this.baseRoute = ['/', 'user', 'users'];

    this.userTable = {
      cols: [
        createColumn('_id', 'PUBLIC.USER.USER.USER_TABLE.ID_COL_TITLE'),
        createColumn('name', 'PUBLIC.USER.USER.USER_TABLE.NAME_COL_TITLE')
      ],
      filterCol: 'name',
      buttons: [
        createRouteButton('', 'edit', 'PUBLIC.SHARED.ACTION.EDIT', this.baseRoute, '_id'),
        createRouteButton('', 'delete', 'PUBLIC.SHARED.ACTION.DELETE', this.baseRoute, '_id')
      ],
      options: createOptions('', 'PUBLIC.USER.USER.USER_TABLE.TITLE', Scrollable.Full)
    };

    this.isProcessing$ = this.store$.pipe(select(UserSelectors.getIsProcessing));
    this.error$ = this.store$.pipe(select(UserSelectors.getError));
    this.users$ = this.store$.pipe(select(UserSelectors.getMany));

    this.store$.dispatch(userActions.usrGetManyUsers());
  }

  createUser(): void {
    observableFrom(this.router.navigate([...this.baseRoute, 'create']))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        /**/
      });
  }

  refresh(): void {
    this.store$.dispatch(userActions.usrGetManyUsers());
  }
}
