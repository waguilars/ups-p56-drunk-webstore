import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  loading: boolean;

  constructor(
    private userSV: UserService,
    private router: Router,
    private alertSv: AlertService
  ) {
    this.listUsers();
    this.loading = true;
  }

  ngOnInit(): void {}

  listUsers(): void {
    this.userSV.getAll().subscribe(
      (res: UserModel[]) => {
        this.users = res;
        this.loading = false;
      },
      (err) => {}
    );
  }

  editUser(index: number): void {
    const editUser = this.users[index];
    this.router.navigate(['/dashboard', 'users', 'edit', editUser.id]);
  }

  blockUser(index: number): void {
    const blockUser = this.users[index];

    this.userSV.block(blockUser).subscribe(
      (res) => {
        this.users[index] = UserModel.getInstance(res.user);
        this.alertSv.showInfo(blockUser, res.msg);
      },
      (err) => this.alertSv.showError('Algo salio mal, vuelve a intentarlo')
    );
  }
}
