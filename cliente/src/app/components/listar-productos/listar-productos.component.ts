import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CProducto } from 'src/app/models/Producto.class';
import { ProductoService } from 'src/app/services/producto.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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

  constructor(private _producto: ProductoService) {
  }

  ngOnInit(): void {
    this.obtenerProductos()
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}


