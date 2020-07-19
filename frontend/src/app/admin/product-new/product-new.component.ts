import { Component, OnInit } from '@angular/core';
import { Product, Category } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styles: [],
})
export class ProductNewComponent implements OnInit {
  product: Product;
  isEdit: boolean;
  categories: Category[];
  img: File;
  pf: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private prodSv: ProductService,
    private catSv: CategoryService
  ) {
    this.product = new Product({});
    this.categories = [];
    this.img = null;
  }

  ngOnInit(): void {
    this.checkPage();
    this.createForm();
    this.loadCategories();
  }

  checkPage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  createForm(): void {
    this.pf = this.fb.group({
      name: [, [Validators.required]],
      descShort: ['', [Validators.required]],
      descLong: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    if (this.pf.invalid) {
      this.pf.markAllAsTouched();
      return;
    }
    this.product = new Product(this.pf.value);
    // console.log(this.product);
  }

  loadImage(evt: Event): void {
    const img = (evt.target as HTMLInputElement).files[0];
    this.img = img;
  }

  loadCategories(): void {
    this.catSv.getAll().subscribe(
      (categories) => {
        this.categories = categories;
        this.category.setValue(this.categories[0]._id);
      },
      (err) => {}
    );
  }

  get name(): AbstractControl {
    return this.pf.get('name');
  }

  get descShort(): AbstractControl {
    return this.pf.get('descShort');
  }

  get descLong(): AbstractControl {
    return this.pf.get('descLong');
  }

  get price(): AbstractControl {
    return this.pf.get('price');
  }

  get category(): AbstractControl {
    return this.pf.get('category');
  }

  get stock(): AbstractControl {
    return this.pf.get('stock');
  }
}
