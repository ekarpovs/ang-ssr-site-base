import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterCredentials } from '~/app/framework/auth/models/auth.model';
import * as FormUtil from '~/app/framework/util/form.util';

import { RegisterValidationService } from './register-validation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    /**
     * An optional error message to display if login failed.
     */
    @Input() error = '';

    /**
     * Flag indicating if login is pending.
     */
    @Input() pending = false;

    /**
     * Dispatches an event to perform login.
     */
    @Output() readonly register: EventEmitter<RegisterCredentials> = new EventEmitter<RegisterCredentials>();

    /**
     * Dispatches an event to switch to the login view.
     */
    @Output() readonly login: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Dispatches an event to switch to the cancel.
     */
    @Output() readonly cancel: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Reference to the login form.
     */
    form: FormGroup;

    // Messages via i18n
    get m(): any {
        return this.valSrv.messages;
    }

    /**
     * Constructor
     */
    constructor(private readonly formBuilder: FormBuilder,
        private readonly valSrv: RegisterValidationService) {
    }

    /**
     * Initializes the component by building the form.
     *
     * TODO: BMR: 01/10/2019: Add form validation in a future post.
     */
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstname: [
                'Fn000',
                this.valSrv.validators.firstname
            ],
            lastname: [
                'Ln000',
                this.valSrv.validators.lastname
            ],
            username: [
                'user00',
                this.valSrv.validators.username
            ],
            email: [
                'user00@g.com',
                this.valSrv.validators.email
            ],
            password: [
                'Us123456',
                this.valSrv.validators.psssword
            ]
        });
    }

    /**
     * Handles the form submission and emits a register event with the user's registration credentials.
     * event
     */
    onRegister(event: any): void {
        const payload: RegisterCredentials = { ...this.form.value };
        this.register.emit(payload);
    }

    /**
     * Emits an event to route the user to the login view.
     * event
     */
    onLogin(event: any): void {
        this.login.emit();
    }

    /**
     * Emits an event to route the user to the home page.
     * event
     */
    onCancel(event: any): void {
        this.cancel.emit();
    }
}
