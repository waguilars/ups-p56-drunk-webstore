import { Component, OnInit } from '@angular/core';
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
    this.user = new UserModel();
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

    // this.loginForm.reset();
    this.alertSv.loading('Verificando credenciales.');
    this.userSv.login(this.user).subscribe(
      (res: any) => {
        this.alertSv.showSuccess(res.user, 'Has iniciado sesion con exito.');
        this.checkAuth();
      },
      (err: any) => {
        this.alertSv.showError(err.error.msg);
      }
    );
  }

  checkAuth(): void {
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
      (err) => {}
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
