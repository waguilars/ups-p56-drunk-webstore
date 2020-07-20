import { Injectable, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  async showInput(title: string): Promise<any> {
    return Swal.fire({
      title,
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El campo esta vacio!';
        }
      },
      confirmButtonColor: '#343a40',
      cancelButtonColor: '#d9534f',
    });
  }

  async showSuccess(
    item: UserModel | Product,
    msg: string,
    isProduct = false
  ): Promise<any> {
    if (isProduct) {
      return Swal.fire({
        title: `Producto agregado`,
        text: msg,
        icon: 'success',
      });
    }
    return Swal.fire({
      title: `Bienvenido ${item.name}`,
      text: msg,
      icon: 'success',
    });
  }

  async showInfo(user: UserModel, msg: string): Promise<any> {
    return Swal.fire({
      title: `${user.name}`,
      text: msg,
      icon: 'info',
    });
  }
  async showInfo2(title: string, msg: string): Promise<any> {
    return Swal.fire({
      title,
      text: msg,
      icon: 'info',
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
