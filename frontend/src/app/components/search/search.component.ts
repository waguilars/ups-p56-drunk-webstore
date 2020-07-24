import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  products: any[];

  constructor(private route: ActivatedRoute, private prodSv: ProductService) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.route.params.subscribe((param) => {
      const term = param.token;
      this.prodSv.search(term).subscribe(
        (res) => {
          this.products = res.productos;
        },
        (err) => {}
      );
    });
  }
}
