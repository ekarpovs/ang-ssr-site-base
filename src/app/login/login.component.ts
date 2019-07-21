import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginCredentials } from '~/app/framework/auth/models/auth.model';
import * as FormUtil from '~/app/framework/util/form.util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
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
    @Output() readonly login: EventEmitter<LoginCredentials> = new EventEmitter<LoginCredentials>();

    /**
     * Dispatches an event to switch to the registration view.
     */
    @Output() readonly register: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Dispatches an event to switch to the cancel.
     */
    @Output() readonly cancel: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Reference to the login form.
     */
    loginForm: FormGroup;

    /**
     * Constructor
     */
    constructor(private readonly formBuilder: FormBuilder) {
    }

    /**
     * Initializes the component by building the form.
     *
     * TODO: BMR: 01/10/2019: Add form validation in a future post.
     */
    ngOnInit(): void {
        this.loginForm = new FormGroup(
            this.formBuilder.group({
                username: [
                    'user00'
                    // [
                    //     Validators.required,
                    //     Validators.email
                    // ]
                ],
                password: [
                    'Us123456'
                    // [
                    //     Validators.required,
                    //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.PASSWORD.MAX_LENGTH)
                    // ]
                ]
            }).controls,
            {
                updateOn: 'blur'
            }
        );
    }

    /**
     * Accessor for the form's value, aka the data container object representing the
     * form field's current values.
     */
    getFormValue(): LoginCredentials {
        return {
            username: FormUtil.getFormFieldValue(this.loginForm, 'username'),
            password: FormUtil.getFormFieldValue(this.loginForm, 'password')
        };
    }

    /**
     * Handles the form submission and emits a login event with the user's credentials.
     * event
     */
    onLogin(event: any): void {
        const payload: LoginCredentials = this.getFormValue();
        this.login.emit(payload);
    }

    /**
     * Emits an event to route the user to the registration view.
     * event
     */
    onRegister(event: any): void {
        this.register.emit();
    }

    /**
     * Emits an event to route the user to the home page.
     * event
     */
    onCancel(event: any): void {
        this.cancel.emit();
    }
}
