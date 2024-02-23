import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CProducto } from 'src/app/models/Producto.class';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup = new FormGroup({})

  constructor(private _fb: FormBuilder, private _router: Router, private toastr: ToastrService, private _producto: ProductoService ) {
    this.productoForm = this._fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  agregarProducto(){
    const PRODUCTO: CProducto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }
    // console.log(PRODUCTO)
    this._producto.addProducto(PRODUCTO).subscribe(data => {
      this.showSuccess()
    })
    this._router.navigate(['/'])

  }
  showSuccess() {
    this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
  }

}
