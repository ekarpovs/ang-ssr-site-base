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
    const settingsKey = ['backend', 'auth', 'auth'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): AuthResponse =>          
        ({
            ...params,
            idToken: response.idToken
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
    const settingsKey = ['backend', 'admin', 'user'];
    const backend = this.config.getSettings(settingsKey);

    return this.http.post<any>(backend.endpoint, params).pipe(
      map((response: AuthResponse): AuthResponse =>          
        ({
            ...params,
            idToken: response.idToken
        })
      )
    );
  }


  logout$(): Observable<AuthResponse> {
    const subject = new BehaviorSubject<AuthResponse>({idToken: ''});

    return subject as Observable<AuthResponse>;
  }
}
