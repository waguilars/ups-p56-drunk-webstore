import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
})
export class NavbarHomeComponent implements OnInit {
  timer: boolean;

  constructor(
    private userSv: UserService,
    private alertSv: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSv.isAuth().subscribe(
      (res) => {},
      (err) => {
        // console.log(err);
        if (this.userSv.logout()) {
          this.alertSv.showError(
            'La sesion no es valida, vuelva a iniciar sesion.'
          );
        }
        this.router.navigateByUrl('/home');
      }
    );
  }

  logout(): void {
    if (this.userSv.logout()) {
      this.router.navigateByUrl('/home');
    }
  }

  get user(): UserModel {
    return this.userSv.user;
  }
}
