import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styles: [],
})
export class UserNewComponent implements OnInit {
  rf: FormGroup;
  validRoles: string[];
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private userSv: UserService,
    private alertSv: AlertService
  ) {
    this.validRoles = ['USER_ROLE', 'ADMIN_ROLE'];
    this.createForm();
    this.loadFormData();
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.rf.invalid) {
      Object.values(this.rf.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(
            (ctrl) => ctrl.markAllAsTouched
          );
        } else {
          control.markAsTouched();
        }
      });
      return;
    }
    this.alertSv.loading();
    const formData = this.rf.value;
    this.user = new UserModel();
    this.user.name = formData.name;
    this.user.lastname = formData.lastname;
    this.user.email = formData.email;
    this.user.password = formData.password;
    this.user.role = formData.role;
    this.user.status = formData.status;

    /* falta imagen */

    this.userSv.register(this.user).subscribe(
      (res) => {
        this.user = res.user;
        this.alertSv.showSuccess(this.user, 'Usuario registrado correctamente');
      },
      (err) => {
        const msg = err.error.msg;
        this.alertSv.showError(msg);
      }
    );
  }

  fileChange(evt: Event): void {
    console.log(evt.target);
  }

  createForm(): void {
    this.rf = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        ],
      ],
      password: ['', Validators.required],

      role: [''],
      status: [''],
    });
  }

  loadFormData(): void {
    this.rf.reset({
      status: true,
      role: this.validRoles[0],
    });
  }

  get name(): AbstractControl {
    return this.rf.get('name');
  }

  get lastname(): AbstractControl {
    return this.rf.get('lastname');
  }

  get email(): AbstractControl {
    return this.rf.get('email');
  }

  get password(): AbstractControl {
    return this.rf.get('password');
  }

  get role(): AbstractControl {
    return this.rf.get('role');
  }

  get status(): AbstractControl {
    return this.rf.get('status');
  }
}
