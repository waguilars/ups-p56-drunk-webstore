import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ProductResponse, Product } from '../models/product.model';
import { environment } from '../../environments/environment';

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

  addNew(product: Product, img: File): Observable<any> {
    if (img) {
      const data = new FormData();
      data.append('img', img, img.name);
      return this.http.post<ProductResponse>(`${this.api}`, product).pipe(
        mergeMap((res: ProductResponse) => {
          const newProduct = new Product(res.product);
          return this.http.put(
            `${environment.api}/upload/product/${newProduct.id}`,
            data
          );
        })
      );

      // 2 request first register, after upload
    } else {
      return this.http.post<ProductResponse>(`${this.api}`, product);
      // only create
    }
  }
}
