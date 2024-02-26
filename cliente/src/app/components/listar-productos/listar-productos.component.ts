import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CProducto } from 'src/app/models/Producto.class';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'categoria', 'ubicacion', 'precio', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //productos?: CProducto[]

  constructor(private _producto: ProductoService, private toastr: ToastrService,  private _router: Router) {
  }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerProductos(){
    this._producto.getProductos().subscribe({
      next:(producto) => {
        this.dataSource = new MatTableDataSource(producto)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;      
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  deleteProducto(id: string){
    this._producto.deleteProducto(id).subscribe({
      next: () =>{
        this.obtenerProductos()
        this.showSuccess()
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  obtenerProducto(id: string){
    this._producto.getProducto(id).subscribe({
      next:(producto) => {
        this._router.navigate([`/editar-producto/:${producto._id}`])
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  showSuccess() {
    this.toastr.error('El producto fue eliminado con exito!', 'Producto Eliminado!');
  }
}


