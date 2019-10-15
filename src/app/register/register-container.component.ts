import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { appRoutePaths } from '~/app/app.routes.paths';
import { RegisterCredentials } from '~/app/framework/auth/models/auth.model';
import { authActions } from '~/app/framework/store/auth/auth/auth.actions';
import * as fromState from '~/app/framework/store/auth/auth/auth.selectors';
import { rtrActions } from '~/app/framework/store/rtr/rtr/rtr.actions';

@Component({
    templateUrl: './register-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class RegisterContainerComponent implements OnInit {
    protected ngUnsubscribe: Subject<void>;
    baseRoute: Array<string>;
    /**
     * The possible login error.
     */
    error$: Observable<string>;

    /**
     * Flag indicating if login is pending.
     */
    pending$: Observable<boolean>;

    /**
     * Constructor.
     */
    constructor(
        private readonly router: Router,
        private readonly store$: Store<any>
        ) {
    }

    /**
     * Initialize the component.
     */
    ngOnInit(): void {
        this.baseRoute = ['/', appRoutePaths.login];
        this.error$ = this.store$.pipe(select(fromState.getError));
        this.pending$ = this.store$.pipe(select(fromState.getIsProcessing));
    }

    /**
     * Attempt to register.
     */
    register(event: RegisterCredentials): void {
        this.store$.dispatch(authActions.authRegister({
            resource: event,
            router: this.router,
            route: this.baseRoute
        }));
    }

    /**
     * Switch to login view.
     */
    login(event: any): void {      
        this.store$.dispatch(authActions.authNavigateToLogin({
            router: this.router
        }));
    } 

    /**
     * Switch to register view.
     */

    cancel(event: any): void {
        this.store$.dispatch(rtrActions.rtrGo({
            router: this.router,
            route: [appRoutePaths.home]
        }));
    }
}
