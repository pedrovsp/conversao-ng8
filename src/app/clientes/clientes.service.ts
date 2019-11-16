import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../login/user';
import { HttpService } from '../services/http.service';

@Injectable()
export class ClientesService {

  private resource = 'users/';

  clientesChanged = new EventEmitter<Observable<User[]>>();

  constructor(private httpService: HttpService) { }

  getAll(): Observable<User[]> {
    return this.httpService.doGet(this.resource);
  }

  add(cliente: User) {
    return this.httpService.doPost(this.resource, JSON.stringify(cliente))
    .pipe(tap(data => this.clientesChanged.emit(this.getAll())));
  }

  remove(id: number) {
    return this.httpService.doDelete(this.resource + id);
  }

  update(cliente: User) {
    return this.httpService.doPut(this.resource, JSON.stringify(cliente));
  }

  getById(id: number): Observable<User> {
    return this.httpService.doGet<User>(this.resource + id);
  }

}
