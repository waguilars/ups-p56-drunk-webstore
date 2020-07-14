import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private userSv: UserService,
    private val: ValidatorService
  ) {
    this.user = new UserModel();
    this.createForm();
    this.loadFormData();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
        lastname: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z ]+$')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
          ],
        ],
        pass1: ['', [Validators.required]],
        pass2: ['', Validators.required],
      },
      {
        validators: this.val.passwordsMatch('pass1', 'pass2'),
      }
    );
  }

  loadFormData(): void {
    this.registerForm.reset({
      name: '',
      lastname: '',
      email: '',
      pass1: '',
      pass2: '',
    });
  }

  signUp(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach((control) => {
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

    this.user.name = this.name.value;
    this.user.lastname = this.lastname.value;
    this.user.email = this.email.value;
    this.user.password = this.pass2.value;

    /* post register */
    this.userSv.register(this.user).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err.errors);
      }
    );
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get lastname(): AbstractControl {
    return this.registerForm.get('lastname');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get pass1(): AbstractControl {
    return this.registerForm.get('pass1');
  }

  get pass2(): AbstractControl {
    return this.registerForm.get('pass2');
  }
}
