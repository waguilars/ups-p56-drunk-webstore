import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions;

  uri = 'http://localhost:4200/assets/img/licor.jpg';

  constructor() {}

  ngOnInit(): void {
    this.setCarouselOpts();
  }

  setCarouselOpts(): void {
    // setTimeout(() => {
    this.customOptions = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      autoHeight: true,
      autoWidth: true,
      navText: ['Atras', 'Siguiente'],
      items: 4,
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

      nav: false,
    };
    // }, 1000);
  }
}
