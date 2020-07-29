import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { CartResponse, Cart } from '../models/cart.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  api: string;
  cart: Cart;

  constructor(private http: HttpClient) {
    this.api = environment.api + '/cart';
  }

  addToCart(prodID: string, quantity: number = 1): Observable<CartResponse> {
    return this.http
      .post<CartResponse>(`${this.api}/${prodID}`, { quantity })
      .pipe(
        map((res) => {
          this.cart = res.carrito;
          return res;
        })
      );
  }

  getCart(): Observable<Cart> {
    return this.http.get<CartResponse>(`${this.api}`).pipe(
      map((res) => {
        this.cart = res.carrito;
        return res.carrito;
      })
    );
  }

  removeFromTheCart(prodID: string): Observable<any> {
    return this.http.delete<CartResponse>(`${this.api}/${prodID}`).pipe(
      map((res) => {
        this.cart = res.carrito;
        return res;
      })
    );
  }

  removeAll(): Observable<any> {
    return this.http.delete<CartResponse>(`${this.api}`).pipe(
      map((res) => {
        this.cart = null;
        return res;
      })
    );
  }

  buy(): Observable<any> {
    return this.http.post('/api/order', null).pipe(
      map((res: any) => {
        this.cart = null;
        return res.order;
      })
    );
  }

  updateItem(prodID: string, quantity: number): Observable<any> {
    return this.http.put(`${this.api}/${prodID}`, { quantity });
  }
}
