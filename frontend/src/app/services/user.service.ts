import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURI = environment.api + '/user';
  constructor(private http: HttpClient) {}

  register(newUser: UserModel): Observable<any> {
    return this.http.post(`${this.apiURI}/registro`, newUser);
  }
}
