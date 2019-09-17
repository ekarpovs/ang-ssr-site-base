import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
// import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthResponse, LoginCredentials, RegisterCredentials } from "./models/auth.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected readonly config: ConfigService, protected readonly http: HttpClient) {}


  login$(loginCredentials: LoginCredentials): Observable<AuthResponse> {
    const params = {
        username: loginCredentials.username,
        password: loginCredentials.password
    };
    const settingsKey = ['backend', 'auth', 'login'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): AuthResponse =>          
        ({
            ...params,
            idToken: response.idToken,
            expiresIn: response.expiresIn,
            currentUser: response.currentUser
        })
      )
    );
  }

  register$(registerCredentials: RegisterCredentials): Observable<AuthResponse> {
    const params = {
      firstname: registerCredentials.firstName,
      lastname: registerCredentials.lastName,
      username: registerCredentials.username,
      password: registerCredentials.password
    };
    const settingsKey = ['backend', 'admin', 'users'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): AuthResponse =>          
        ({
            ...params,
            idToken: response.idToken,
            expiresIn: response.expiresIn,
            currentUser: response.currentUser
        })
      )
    );
  }


  logout$(): Observable<AuthResponse> {
    const curUser = { id: '', name: '' };
    const subject = new BehaviorSubject<AuthResponse>({idToken: '', expiresIn: 0, currentUser: curUser });

    return subject as Observable<AuthResponse>;
  }
}
