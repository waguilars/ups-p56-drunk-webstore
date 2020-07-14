import { Injectable, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  async showSuccess(user: UserModel, msg: string): Promise<any> {
    return Swal.fire({
      title: `Bienvenido ${user.name}`,
      text: msg,
      icon: 'success',
    });
  }

  async showError(msg: string): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    });
  }

  loading(msg: string = null): void {
    Swal.fire({
      title: 'Espere',
      text: msg || 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }
}
