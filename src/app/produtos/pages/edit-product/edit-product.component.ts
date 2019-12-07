import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private productId: number;
  public product: Product = new Product({});
  public productForm: FormGroup;

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productsService.getById(this.productId).pipe(tap(apiProduct => {
        this.product = apiProduct;
        this.buildEditForm();
      })).subscribe();
    } else {
      this.buildCreateForm()
    }

  }

  buildCreateForm() {
    this.productForm = this.fb.group({
      name: [],
      description: [],
      value: []
    });
  }

  buildEditForm() {
    this.productForm = this.fb.group({
      name: [this.product.name],
      description: [this.product.description],
      value: [this.product.price]
    });
  }

  save() {
    this.product.name = this.productForm.get('name').value;
    this.product.description = this.productForm.get('description').value;
    this.product.price = this.productForm.get('value').value;

    if (this.productId) {
      this.productsService.update(this.product).pipe(tap(() => {
        this.router.navigate(['/produtos']);
      })).subscribe();  
    } else {
      this.productsService.add(this.product).pipe(tap(() => {
        this.router.navigate(['/produtos']);
      })).subscribe();
    }
  }

}
