import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api: string;

  constructor(private http: HttpClient) {
    this.api = environment.api + '/order';
  }

  getMyOrders(): Observable<any> {
    return this.http.get(this.api);
  }
}
