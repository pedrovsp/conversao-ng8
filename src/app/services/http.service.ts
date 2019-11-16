import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { finalize } from 'rxjs/internal/operators/finalize';

const API_URL = environment.apiAddress;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private loading = false;

  constructor(private httpClient: HttpClient) { }

  public doGet<T>(resource: string): Observable<T> {
    this.loading = true;
    return this.httpClient.get<T>(API_URL + resource, { headers: this.getLoggedHeaders() })
      .pipe(tap(
        success => {
          return success;
        },
        error => {
          this.handleError(error);
        }
      ), finalize(() => this.loading = false));
  }

  public doPost<T>(resource: string, body: T): Observable<T> {
    this.loading = true;
    return this.httpClient.post<T>(API_URL + resource, body, { headers: this.getLoggedHeaders() })
      .pipe(tap(
        success => {
          return success;
        },
        error => {
          this.handleError(error);
        }
      ), finalize(() => this.loading = false));
  }

  public doPut<T>(resource: string, body: T): Observable<T> {
    this.loading = true;
    return this.httpClient.post<T>(API_URL + resource, body, { headers: this.getLoggedHeaders() })
      .pipe(tap(
        success => {
          return success;
        },
        error => {
          this.handleError(error);
        }
      ), finalize(() => this.loading = false));
  }

  public doDelete<T>(resource: string): Observable<T> {
    this.loading = true;
    return this.httpClient.delete<T>(API_URL + resource, { headers: this.getLoggedHeaders() })
      .pipe(tap(
        success => {
          return success;
        },
        error => {
          this.handleError(error);
        }
      ), finalize(() => this.loading = false));
  }

  private handleError(error: any) {
    const erro = error.message || 'Server error';
    console.error('Ocorreu um erro: ', error);
    return throwError(erro);
  }

  private getLoggedHeaders() {
	let headers = new HttpHeaders();
	headers = headers.append('Content-Type', 'application/json');
	headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
	return headers;
  }

}
