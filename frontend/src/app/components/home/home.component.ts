import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions;
  products: any[];

  uri = 'http://localhost:4200/assets/img/licor.jpg';

  constructor(private prodSv: ProductService) {}

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
}
