import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CProducto } from '../models/Producto.class';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }
  url = 'http://localhost:4000/api/productos/'

  getProductos(): Observable<any>{
    return this._http.get(this.url)
  }

  addProducto(data: any): Observable<any>{
    return this._http.post(this.url, data)
  }

  deleteProducto(id: string): Observable<any>{
    return this._http.delete(`${this.url}/${id}`)
  }

  updateProducto(id: string): Observable<any>{
    return this._http.delete(`${this.url}/${id}`)
  }

  getProducto(id: string): Observable<any>{
    return this._http.get(this.url + id)
  }

  editPorducto(id: string, producto: CProducto):Observable<any>{
    return this._http.put(this.url + id, producto)
  }
}
