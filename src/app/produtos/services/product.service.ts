import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

const url = 'products/';

@Injectable()
export class ProductService {

  constructor(private httpService: HttpService) { }

  getProducts() {
    return this.httpService.doGet(url);
  }
}
