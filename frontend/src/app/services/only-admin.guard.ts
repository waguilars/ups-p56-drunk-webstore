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
export class OnlyAdminGuard implements CanActivate {
  constructor(private userSv: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userSv.isAuth().subscribe(
        (res) => {
          if (res.user.role === 'ADMIN_ROLE') {
            resolve(true);
          } else {
            resolve(false);
            this.router.navigateByUrl('/home');
          }
        },
        (err) => {
          resolve(false);
          this.router.navigateByUrl('/home');
        }
      );
    });
  }
}
