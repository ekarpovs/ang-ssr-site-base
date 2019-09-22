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
    registerForm: FormGroup;

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
        this.registerForm = new FormGroup(
            this.formBuilder.group({
                firstName: [
                    "Fn00"
                    // [
                    //     Validators.required,
                    //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.FIRST_NAME.MAX_LENGTH)
                    // ]
                ],
                lastName: [
                    "Ln00"
                    // [
                    //     Validators.required,
                    //                     //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.FIRST_NAME.MAX_LENGTH)
                    // ]
                ],
                email: [
                    'user00@g.com'
                    // [
                    //     Validators.required,
                    //     Validators.email
                    // ]
                ],
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
    getFormValue(): RegisterCredentials {
        return {
            firstName: FormUtil.getFormFieldValue(this.registerForm, "firstName"),
            lastName: FormUtil.getFormFieldValue(this.registerForm, "lastName"),
            email: FormUtil.getFormFieldValue(this.registerForm, "email"),
            username: FormUtil.getFormFieldValue(this.registerForm, "username"),
            password: FormUtil.getFormFieldValue(this.registerForm, "password")
        };
    }

    /**
     * Handles the form submission and emits a register event with the user's registration credentials.
     * event
     */
    onRegister(event: any): void {
        const payload: RegisterCredentials = this.getFormValue();
        this.register.emit(payload);
    }

    /**
     * Emits an event to route the user to the home page.
     * event
     */
    onCancel(event: any): void {
        this.cancel.emit();
    }
}
