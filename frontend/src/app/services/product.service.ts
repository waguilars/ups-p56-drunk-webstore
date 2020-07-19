import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = environment.api;

  constructor(private http: HttpClient) {
    this.api += '/product';
  }

  getAll(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.api);
  }
}
