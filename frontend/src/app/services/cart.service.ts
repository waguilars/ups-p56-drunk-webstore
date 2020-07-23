import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { CartResponse } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.api + '/cart';
  }

  addToCart(prodID: string, quantity: number = 1): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.api}/${prodID}`, { quantity });
  }
}
