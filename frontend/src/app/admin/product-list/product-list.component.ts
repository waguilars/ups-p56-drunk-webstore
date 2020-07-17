import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  loading: boolean;
  products: any[] = [1, 2, 3];

  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {}
}
