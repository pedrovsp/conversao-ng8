import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductService } from './services/product.service';
import { EditProductComponent } from './pages/edit-product/edit-product.component';


@NgModule({
  declarations: [ProductsPageComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
