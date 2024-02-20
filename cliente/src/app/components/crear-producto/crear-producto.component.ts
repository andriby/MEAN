import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CProducto } from 'src/app/models/Producto.class';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup = new FormGroup({})
  constructor(private _fb: FormBuilder, private _router: Router, private toastr: ToastrService ) {
    this.productoForm = this._fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  agregarProducto(){
    const PRODUCTO: CProducto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }
    this.showSuccess()
    console.log(PRODUCTO)
    this._router.navigate(['/'])


  }
  showSuccess() {
    this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
  }

}
