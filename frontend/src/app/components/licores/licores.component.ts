import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
})
export class LicoresComponent implements OnInit {
  liquor: any;

  constructor(
    private prodSv: ProductService,
    private route: ActivatedRoute,
    private alertSv: AlertService,
    private cartSv: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showLiquor();
  }

  showLiquor(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.prodSv.getById(id).subscribe((res) => {
      this.liquor = res;
      console.log(res);
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
