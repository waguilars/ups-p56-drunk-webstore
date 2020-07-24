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

  getAll(): Observable<any> {
    return this.http.get(this.api).pipe(
      map((res: any) => {
        const prods: [] = res.product;
        res.product = prods.map((prod) => new Product(prod));
        return res;
      })
    );
  }

  getLast(limit: number = 20, p: number = 1): Observable<any> {
    return this.http.get(this.api + `/last?limit=${limit}&page=${p}`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map((res: ProductResponse) => {
        return new Product(res.product);
      })
    );
  }

  updateProduct(product: Product, img: File): Observable<any> {
    if (img) {
      const data = new FormData();
      data.append('img', img, img.name);
      return this.http
        .put<ProductResponse>(`${this.api}/${product.id}`, product)
        .pipe(
          mergeMap((res: any) => {
            const newProduct = new Product(res.data);

            return this.http.put(
              `${environment.api}/upload/product/${newProduct.id}`,
              data
            );
          })
        );
    } else {
      return this.http.put<ProductResponse>(
        `${this.api}/${product.id}`,
        product
      );
    }
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
