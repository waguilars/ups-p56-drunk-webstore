import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private userSv: UserService,
    private alertSv: AlertService,
    private router: Router
  ) {
    this.user = UserModel.getInstance({});
    this.createForm();
    this.loadFormData();
  }

  ngOnInit(): void {}

  signIn(): void {
    if (this.loginForm.invalid) {
      // console.log(this.loginForm);
      console.error('Invalid Form.');
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((ctrl) =>
            ctrl.markAllAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });

      return;
    }
    /* TODO: Implenets post to login */
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    this.userSv.signIn(this.user).subscribe(
      (user) => {
        this.user = user;
        this.alertSv.showSuccess(user, 'Bienvenido a Drunk WebStore');
        this.router.navigateByUrl('/home');
      },
      (err) => {
        // console.log(err);
        this.alertSv.showError(err.error.msg);
      }
    );
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  loadFormData(): void {
    this.loginForm.reset({
      email: '',
      password: '',
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
