import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { EMPTY, Observable, of as observableOf } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { BaseEntityService, HTTP_CLIENT__MAX_RETRIES, UniqueId } from '~/app/framework/ngrx';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseEntityService<User> {

  constructor(protected readonly config: ConfigService, protected readonly http: HttpClient) {
    super(config, http, ['backend', 'admin', 'users']);
  }
}
