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
    super(config, http, ['backend', 'admin', 'user']);
  }

  getMany$(): Observable<Array<User>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<User>>(backend.endpoint).pipe(
      retry(HTTP_CLIENT__MAX_RETRIES)
    );
  }

  getOne$(id: UniqueId): Observable<User> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<User>>(backend.endpoint).pipe(
      retry(HTTP_CLIENT__MAX_RETRIES),
      map(cur => cur.find(item => item._id === id))
    );
  }

  createMany$(resources: Array<User>): Observable<Array<User>> {
    return EMPTY;
  }

  createOne$(resource: User): Observable<User> {
    // NOTE: fake impl
    return observableOf({
      ...resource,
      _id: '100000000000000000000001'
    }); // NOTE: simulate slow network
  }

  updateMany$(resources: Array<User>): Observable<Array<User>> {
    return EMPTY;
  }

  updateOne$(resource: User): Observable<User> {
    // NOTE: fake impl
    return observableOf(resource); // NOTE: simulate slow network
  }

  deleteMany$(ids: Array<UniqueId>): Observable<Array<UniqueId>> {
    return EMPTY;
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    // NOTE: fake impl
    return observableOf(id); // NOTE: simulate slow network
  }
}
