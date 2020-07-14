import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
})
export class NavbarHomeComponent implements OnInit {
  user: UserModel;

  constructor(private userSv: UserService) {
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

  ngOnInit(): void {}
}
