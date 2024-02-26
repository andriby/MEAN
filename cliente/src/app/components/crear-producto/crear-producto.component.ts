import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  titulo: string = "CREAR PRODUCTO"
  id: string | null
  nId: string | null = ""
  constructor(private _fb: FormBuilder, private _router: Router, private toastr: ToastrService, private _producto: ProductoService, private route: ActivatedRoute) {
    this.productoForm = this._fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.nId = this.id?.slice(1)
    }
  }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarProducto(){
    const PRODUCTO: CProducto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if (this.nId) {
      this._producto.editPorducto(this.nId, PRODUCTO).subscribe({
        next: () =>{
          this.toastr.success('El producto fue editado con exito!', 'Producto editado!');
          this._router.navigate(['/'])
        },
        error:(err) => {
          console.error(err);        
        },
      })
    } else{
      this._producto.addProducto(PRODUCTO).subscribe({
        next: () =>{
          this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
          this._router.navigate(['/'])
        },
        error:(err) =>{
          console.error(err);
        },
      })
    }
  }

  esEditar(){
    if(this.nId !== null){
      this.titulo = "EDITAR PRODUCTO"
      this._producto.getProducto(this.nId).subscribe({
        next: (producto) => {
          this.productoForm = this._fb.group({
            nombre: [producto.nombre, Validators.required],
            categoria: [producto.categoria, Validators.required],
            ubicacion: [producto.ubicacion, Validators.required],
            precio: [producto.precio, Validators.required]
          })
        },
        error:(err) => {
          console.error(err);
        },
      })
    }
  }

}
