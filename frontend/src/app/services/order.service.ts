import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api: string;
  constructor() {
    this.api = environment.api + '/order';
  }
}