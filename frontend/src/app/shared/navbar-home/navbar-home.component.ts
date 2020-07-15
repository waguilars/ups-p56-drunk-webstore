import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
})
export class NavbarHomeComponent implements OnInit {
  user: UserModel;
  timer: boolean;

  constructor(
    private userSv: UserService,
    private router: Router,
    private alertSv: AlertService
  ) {
    this.userSv.getAuthUser.subscribe(
      (data: any) => {
        if (data) {
          this.user = new UserModel();
          this.user = data;
          // this.timer = data;
        }
      },
      (err: any) => {
        // console.log(err);
        this.user = null;
        this.timer = false;
      }
    );
  }

  ngOnInit(): void {
    if (this.userSv.getToken()) {
      this.userSv.isAuth().subscribe(
        (res) => {
          const timer = res.data.exp - Math.floor(new Date().getTime() / 1000);

          setTimeout(() => {
            // console.log(timer);
            if (this.timer) {
              this.userSv.logout();
              this.alertSv.showError('La sesion ha expirado').then(() => {
                console.log(this.timer);
                this.router.navigateByUrl('/home');
              });
            }
          }, timer * 1000);
        },
        (err) => {
          this.user = null;
        }
      );
    }
  }

  logout(): void {
    this.userSv.logout();
  }
}
