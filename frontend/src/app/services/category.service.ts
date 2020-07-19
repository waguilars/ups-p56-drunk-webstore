import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/product.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  api: string;
  constructor(private http: HttpClient) {
    this.api = environment.api + '/category';
  }

  getAll(): Observable<Category[]> {
    return this.http.get(`${this.api}`).pipe(
      map((res: any) => {
        const categories: Category[] = res.categories;
        return categories;
      })
    );
  }
}
