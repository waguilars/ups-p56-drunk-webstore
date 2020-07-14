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

  constructor(
    private userSv: UserService,
    private router: Router,
    private alertSv: AlertService
  ) {
    this.userSv.getAuthUser.subscribe(
      (data: any) => {
        this.user = new UserModel();
        this.user = data;
      },
      (err: any) => {
        this.user = null;
      }
    );
  }

  ngOnInit(): void {
    this.userSv.isAuth().subscribe(
      (res) => {
        const timer = res.data.exp - Math.floor(new Date().getTime() / 1000);

        setTimeout(() => {
          // console.log(timer);
          this.userSv.logout();
          this.alertSv.showError('La sesion ha expirado').then(() => {
            this.router.navigateByUrl('/home');
          });
        }, timer * 1000);
      },
      (err) => {
        this.user = null;
      }
    );
  }
}
