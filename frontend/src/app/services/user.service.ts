import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {
  UserModel,
  ResponseLogin,
  ResponseValidSesion,
  SessionData,
} from '../models/user.model';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURI = environment.api + '/user';
  user: UserModel;

  constructor(private http: HttpClient) {}

  signIn(user: UserModel): Observable<UserModel> {
    return this.http.post(`${this.apiURI}/login`, user).pipe(
      map((res: ResponseLogin) => {
        this.user = UserModel.getInstance(res.user);
        localStorage.setItem('token', res.token);
        return this.user;
      })
    );
  }

  logout(): boolean {
    const token = localStorage.getItem('token');
    this.user = null;
    if (token) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }

  block(user: UserModel): Observable<any> {
    return this.http.delete(`${this.apiURI}/${user.id}`);
  }

  register(newUser: UserModel): Observable<any> {
    return this.http.post(`${this.apiURI}/registro`, newUser);
  }

  uploadImage(image: File, user: UserModel): Observable<any> {
    const url = `${environment.api}/upload/user/${user.id}`;
    const fd = new FormData();
    fd.append('img', image, image.name);
    return this.http.put(url, fd).pipe(
      map((res: any) => {
        return UserModel.getInstance(res.user);
      })
    );
  }

  update(user: UserModel): Observable<any> {
    // console.log(user);
    return this.http.put(`${this.apiURI}/${user.id}`, user);
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

  isAuth(): Observable<SessionData> {
    return this.http.post(`${this.apiURI}/auth`, null).pipe(
      map((res: ResponseValidSesion) => {
        this.user = res.data.user;
        return res.data;
      })
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
