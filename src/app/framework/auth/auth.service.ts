import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
// import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auth, AuthResponse, LoginCredentials, RegisterCredentials } from "./models/auth.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected readonly config: ConfigService, protected readonly http: HttpClient) {}


  login$(loginCredentials: LoginCredentials): Observable<Auth> {
    const params = {
        username: loginCredentials.username,
        password: loginCredentials.password
    };
    const settingsKey = ['backend', 'auth', 'auth'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): Auth =>          
        ({
            ...params,
            token: response.idToken
        })
      )
    );
  }

  register$(registerCredentials: RegisterCredentials): Observable<Auth> {
    const params = {
      firstname: registerCredentials.firstName,
      lastname: registerCredentials.lastName,
      username: registerCredentials.username,
      password: registerCredentials.password
    };
    const settingsKey = ['backend', 'admin', 'user'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): Auth =>          
        ({
            ...params,
            token: response.idToken
        })
      )
    );
  }


  logout$(): Observable<Auth> {
    const auth: Auth = {
      username: '',
      password: '',
      token: ''
    };
    const subject = new BehaviorSubject<Auth>(auth);

    return subject as Observable<Auth>;
  }
}
