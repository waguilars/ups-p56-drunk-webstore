import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userSV: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userSV.getToken();

    if (token) {
      const newReq = request.clone({
        setHeaders: {
          token,
        },
      });

      return next.handle(newReq);
    }

    // console.log('object');
    return next.handle(request);
  }
}
