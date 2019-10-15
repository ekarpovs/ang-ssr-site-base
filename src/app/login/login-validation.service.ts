import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';


const DOMAIN_NAME_MIN_LENGTH = 5;
const DOMAIN_NAME_MAX_LENGTH = 255;
const OWNER_NAME_MIN_LENGTH = 5;
const OWNER_NAME_MAX_LENGTH = 255;
const USER_NAME_MIN_LENGTH = 5;
const USER_NAME_MAX_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 255;
const EMAIL_MAX_LENGTH = 255;

@Injectable({
  providedIn: 'root'
})
export class LoginValidationService {
// Messages via i18n
messages = {
  username: [
    { type: 'required', message: 'User name is required' },
    { type: 'minlength', message: `User name must be at least ${USER_NAME_MIN_LENGTH} characters long` },
    { type: 'maxlength', message: `User name cannot be more than ${USER_NAME_MAX_LENGTH} characters long` },
    { type: 'pattern', message: 'User name must contain only numbers and letters' },
    { type: 'pattern', message: 'Enter a valid user name' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` },
    { type: 'maxlength', message: `Password cannot be more than ${PASSWORD_MAX_LENGTH} characters long` },
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ]
}; 

validators = {
  username: Validators.compose([
    Validators.required,
    Validators.minLength(USER_NAME_MIN_LENGTH),
    Validators.maxLength(USER_NAME_MAX_LENGTH),
    Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
  ]),
  psssword: Validators.compose([
    Validators.required,
    Validators.minLength(PASSWORD_MIN_LENGTH),
    Validators.maxLength(PASSWORD_MAX_LENGTH),
    // this is for the letters (both uppercase and lowercase) and numbers
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
  ])
};

  // constructor() { }
}
