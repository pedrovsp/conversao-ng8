import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { Http, Headers } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginServiceService {

  private url = environment.apiAddress + 'auth/';

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  constructor(private router: Router,
              private http: HttpClient) { }

  signIn(user: User) {
    this.http.post(this.url + 'login/', JSON.stringify(user), { headers: this.getHeaders() }).pipe(tap(
      data => this.login(data),
      error => this.authenticated = false)).subscribe();
  }

  login(body) {
    this.authenticated = true;
    localStorage.setItem('token', body.token);
    this.showNavBar(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('token');
    this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showNavBar(ifShow: boolean) {
    this.showNavBarEmitter.emit(ifShow);
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

}
