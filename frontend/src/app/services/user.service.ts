import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURI = environment.api + '/user';

  @Output() getAuthUser: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.getAuthUser = new EventEmitter();
  }

  register(newUser: UserModel): Observable<any> {
    return this.http.post(`${this.apiURI}/registro`, newUser);
  }

  login(data: UserModel): Observable<any> {
    return this.http.post(`${this.apiURI}/login`, data).pipe(
      map((res: any) => {
        this.saveToken(res.token);
        this.getAuthUser.emit(res.user);
        return res;
      })
    );
  }

  logout(): void {
    this.getAuthUser.error('logout');
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuth(): Observable<any> {
    return this.http.post(`${this.apiURI}/auth`, null).pipe(
      map((res: any) => {
        // console.log(res);
        this.getAuthUser.emit(res.data.user);
        return res;
      })
    );
  }
}
