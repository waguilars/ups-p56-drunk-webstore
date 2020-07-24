import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styles: [],
})
export class UserOrdersComponent implements OnInit {
  constructor(private orderSV: OrderService) {}
  orders: [];

  ngOnInit(): void {
    this.getMyOders();
  }

  getMyOders(): void {
    this.orderSV.getMyOrders().subscribe((res) => {
      this.orders = res.order;
      console.log(this.orders);
    });
  }
}
