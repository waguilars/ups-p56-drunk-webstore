import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private userSv: UserService) {}

  passwordsMatch(pass1: string, pass2: string): CallableFunction {
    return (form: FormGroup) => {
      const pass1Ctrl = form.controls[pass1];
      const pass2Ctrl = form.controls[pass2];

      if (pass1Ctrl.value === pass2Ctrl.value) {
        pass2Ctrl.setErrors(null);
      } else {
        pass2Ctrl.setErrors({ notMatchPasswords: true });
      }
    };
  }
}
