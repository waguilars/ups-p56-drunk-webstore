import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  get(id: string): Observable<UserModel | any> {
    return this.http.get(`${this.apiURI}/${id}`).pipe(
      map((res: any) => {
        // console.log(res);
        const user = res.user;
        user.id = res.user._id;
        delete user._id;
        return user;
      })
    );
  }

  getAll(): Observable<UserModel[]> {
    return this.http.get(`${this.apiURI}/`).pipe(
      map((res: any) => {
        let users = res.user;
        users = users.map((user: any) => {
          user.id = user._id;
          delete user._id;
          return user;
        });
        return users;
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
