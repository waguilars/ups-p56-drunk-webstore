import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart;
  constructor(private cartSv: CartService) {
    this.cart = null;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartSv.getCart().subscribe((res) => {
      console.log(res);
      this.cart = res;
    });
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
}
