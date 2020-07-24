import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
})
export class NavbarHomeComponent implements OnInit {
  timer: boolean;
  isAdmin: boolean;
  sf: FormGroup;

  constructor(
    private userSv: UserService,
    private alertSv: AlertService,
    private cartSv: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.sf = this.fb.group({ term: [''] });
    this.search();

    const token = this.userSv.getToken();
    if (token) {
      this.userSv.isAuth().subscribe(
        (res) => {
          this.getCart();
        },
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
  }

  logout(): void {
    if (this.userSv.logout()) {
      this.router.navigateByUrl('/home');
    }
  }

  get user(): UserModel {
    const user = this.userSv.user;
    if (user) {
      const role = user.role || null;
      this.isAdmin = role && role === 'ADMIN_ROLE' ? true : false;
    }
    return user;
  }

  getCart(): void {
    this.cartSv.getCart().subscribe(
      (res) => {},
      (err) => {}
    );
  }

  search(): void {
    this.sf.get('term').valueChanges.subscribe((value) => {
      if (value) {
        this.router.navigate(['search', value]);
      }
    });
  }

  get cart(): Cart {
    return this.cartSv.cart;
  }
}
