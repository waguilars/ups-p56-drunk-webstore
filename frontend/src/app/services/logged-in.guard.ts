import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private userSv: UserService, private router: Router) {}

  canActivate(): boolean {
    const token = this.userSv.getToken();
    if (!token) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
