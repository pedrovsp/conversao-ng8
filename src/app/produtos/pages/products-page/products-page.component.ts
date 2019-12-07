import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  public products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().pipe(
      tap((apiProducts: any) => {
        this.products = apiProducts.content;
      })
    ).subscribe();
  }

  delete(product: Product) {
    this.productService.remove(product.id).pipe(tap(() => {
      const indexToRemove = this.products.findIndex(prod => prod.id === product.id);
      this.products.splice(indexToRemove, 1);
    })).subscribe();
  }

  ngOnDestroy() {
  }

}
