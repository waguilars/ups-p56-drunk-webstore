import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  loading: boolean;

  constructor(private userSV: UserService) {
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
}
