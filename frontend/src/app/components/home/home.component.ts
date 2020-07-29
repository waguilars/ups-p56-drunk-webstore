import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';

import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  products: any[];
  recommended: any[];
  pagination: {
    next: number;
    prev: number;
    page: number;
    total: number[];
  };
  loggedIn: boolean;

  constructor(
    private prodSv: ProductService,
    private userSV: UserService,
    private cartSv: CartService,
    private alertSv: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.setCarouselOpts();
    this.loadLastProducts();
    this.loadRecommended();
  }

  loadLastProducts(p = 1): void {
    this.prodSv.getLast(16, p).subscribe((res) => {
      this.products = res.data.docs;
      const { nextPage: next, prevPage: prev, page, totalPages } = res.data;
      const total = Array.from({ length: totalPages }, (_, index) => index + 1);
      this.pagination = { next, prev, page, total };

      // console.log(p);
    });
  }

  addToCart(prodId: string): void {
    this.alertSv.loading();
    this.cartSv.addToCart(prodId).subscribe(
      (res) => {
        this.alertSv
          .showGenericSuccess('Carrito de compras', 'Producto agregado!')
          .then((val) => {
            if (val.isConfirmed) {
              this.router.navigateByUrl('/cart');
            }
          });
      },
      (err) => {
        this.alertSv
          .showError('Debes iniciar sesion antes de agregar productos.')
          .then(() => this.router.navigate(['/login']));
        // console.log(err);
      }
    );
  }

  loadRecommended(): void {
    this.userSV.isAuth().subscribe(
      (res: any) => {
        const id = res.user._id;
        this.loggedIn = true;
        this.prodSv.getRecommended(id).subscribe(
          (res2: any) => {
            this.recommended = res2.products;
            console.log(this.recommended);
          },
          (err) => {}
        );
      },
      (err) => {
        this.loggedIn = false;
      }
    );
  }
}
