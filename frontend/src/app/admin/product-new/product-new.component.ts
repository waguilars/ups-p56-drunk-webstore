import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs';

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

  @ViewChild('prodImg') prodImg: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private prodSv: ProductService,
    private catSv: CategoryService,
    private alertSv: AlertService
  ) {
    this.product = new Product({});
    this.categories = [];
    this.img = null;
  }

  ngOnInit(): void {
    this.checkPage();
    this.createForm();
    this.loadCategories();
    // this.loadDataTest();
  }

  checkPage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.prodSv.getById(id).subscribe(
        (product) => {
          this.product = product;
          this.loadFormData();
        },
        (err) => {
          this.alertSv.showError(err.error.msg);
          this.router.navigateByUrl('/dashboard/products');
        }
      );
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

  loadFormData(): void {
    // console.log(this.product);
    this.pf.reset({
      name: this.product.name,
      descShort: this.product.desc_short,
      descLong: this.product.desc_long,
      price: this.product.price,
      stock: this.product.stock,
    });
    this.category.setValue(this.product.category);
  }

  submit(): void {
    if (this.pf.invalid) {
      this.pf.markAllAsTouched();
      return;
    }

    let request: Observable<any>;

    if (this.isEdit) {
      const id = this.product.id;
      const newData = new Product(this.pf.value);
      newData.id = id;
      request = this.prodSv.updateProduct(newData, this.img);
    } else {
      this.product = new Product(this.pf.value);
      request = this.prodSv.addNew(this.product, this.img);
    }

    request.subscribe(
      (res) => {
        const msg = this.isEdit
          ? 'Se ha actualizado correctamente'
          : `Haz agregado ${res.product.name} a la tienda`;

        const alert = !this.isEdit
          ? this.alertSv.showSuccess(res.product, msg, true)
          : this.alertSv.showSuccess(res.data, msg, true);

        alert.then(() => this.router.navigate(['/dashboard', 'products']));
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log(this.product);
  }

  newCategory(): void {
    this.alertSv
      .showInput('Escriba el nombre de la categoria')
      .then((catName) => {
        const category = catName.value;
        if (!category) {
          return;
        }

        this.catSv.newCategory(category).subscribe((cat) => {
          this.alertSv.showInfo2(
            'Categoria agregada!',
            `${cat.name} ha sido agregada a la lsita de categorias.`
          );
          this.categories.push(cat);
        });
      });
  }

  loadImage(evt: Event): void {
    const img = (evt.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (ev) => {
      // console.log(this.prodImg);
      this.prodImg.nativeElement.src = reader.result;
    };
    this.img = img;
  }

  loadCategories(): void {
    this.catSv.getAll().subscribe(
      (categories) => {
        this.categories = categories;
        if (!this.isEdit) {
          this.category.setValue(this.categories[0]._id);
        }
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
