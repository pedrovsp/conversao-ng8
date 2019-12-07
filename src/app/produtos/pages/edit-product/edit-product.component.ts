import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Route, ActivatedRoute } from '@angular/router';
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
  public product: Product;
  public productForm: FormGroup;

  constructor(private productsService: ProductService,
              private router: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.productId = Number(this.router.snapshot.paramMap.get('id'));
    this.productsService.getById(this.productId).pipe(tap(apiProduct => {
      this.product = apiProduct;
      this.buildForm();
    })).subscribe();
  }

  buildForm() {
    this.productForm = this.fb.group({
      name: [this.product.name],
      description: [this.product.description],
      value: [this.product.price]
    });
  }

}
