import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
})
export class LicoresComponent implements OnInit {
  liquor: any;

  constructor(private prodSv: ProductService, private route: ActivatedRoute) {}

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
}
