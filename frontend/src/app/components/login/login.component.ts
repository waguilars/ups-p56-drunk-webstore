import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserModel;

  constructor(private fb: FormBuilder) {
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

    this.loginForm.reset();
    // console.log(this.loginForm);
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
