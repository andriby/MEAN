import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }
  url = 'http://localhost:4000/api/productos/'

  getProductos(): Observable<any>{
    return this._http.get(this.url)
  }
}
