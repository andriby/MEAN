import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {

  constructor(private _producto: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos(){
    this._producto.getProductos().subscribe({
      next:(producto) => {
        console.log(producto)
      },
      error:(err) => {
        console.error(err)
      }
    })
  }
}
