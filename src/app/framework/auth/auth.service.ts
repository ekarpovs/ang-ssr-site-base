import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
// import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auth, AuthResponse, LoginCredentials } from "./models/auth.model";


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
    // console.info(`login( Logging into API "${backend}" with creds: ${params.username} / ${params.password} )`);

    return this.http.post<any>(backend.endpoint, { name: loginCredentials.username, password: loginCredentials.password }).pipe(
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
