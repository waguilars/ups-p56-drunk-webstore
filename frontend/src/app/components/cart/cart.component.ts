import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart;
  constructor(private cartSv: CartService, private alertSv: AlertService) {
    this.cart = null;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartSv.getCart().subscribe(
      (res) => {
        console.log(res);
        this.cart = res;
      },
      (err) => {}
    );
  }

  deleteProduct(prodID: string): void {
    console.log(prodID);
    this.cartSv.removeFromTheCart(prodID).subscribe(
      (res) => {
        console.log(res);
        this.cart = res.carrito;
      },
      (err) => {}
    );
  }

  clearCart(): void {
    this.cartSv.removeAll().subscribe((res) => {
      this.cart = null;
    });
  }

  buy(): void {
    this.cartSv.buy().subscribe((res) => {
      this.cart = null;
      this.alertSv.Swal.fire({
        title: 'Compra realizada con exito!',
        icon: 'success',
      });
    });
  }
}
