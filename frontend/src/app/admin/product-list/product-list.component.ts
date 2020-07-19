import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  loading: boolean;
  products: Product[];

  constructor(
    private prodSv: ProductService,
    private alertSV: AlertService,
    private router: Router
  ) {
    this.products = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.loading = true;
    this.prodSv.getAll().subscribe(
      (res) => {
        this.products = res.product;
        this.loading = false;
      },
      (err) => {
        this.alertSV.showError('Recarga la página.');
      }
    );
  }

  edit(index: number): void {
    const prod = this.products[index];
    this.router.navigate(['/dashboard', 'products', 'edit', prod.id]);
  }

  delete(index: number): void {}
}
