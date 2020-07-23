import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions;
  products: any[];

  uri = 'http://localhost:4200/assets/img/licor.jpg';

  constructor(
    private prodSv: ProductService,
    private cartSv: CartService,
    private alertSv: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.setCarouselOpts();
    this.loadLastProducts();
  }

  setCarouselOpts(): void {
    // setTimeout(() => {
    this.customOptions = {
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      autoHeight: false,
      autoWidth: true,

      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 4,
        },
      },
    };
    // }, 1000);
  }

  loadLastProducts(): void {
    this.prodSv.getLast().subscribe((res) => {
      this.products = res.data.docs;
      console.log(this.products);
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
        this.alertSv.showError('Algo salio mal! Intentalo de nuevo.');
        console.log(err);
      }
    );
  }
}
