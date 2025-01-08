import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  public fb = inject(FormBuilder);

  public formCliente = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    apellidoPaterno: [, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    apellidoMaterno: [, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    direccion: [, [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
    telefono: [, [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    correo: [, [Validators.required, Validators.email]]
  });

  public listaClientes: Cliente[] = [];
  public cliente: Cliente | null = null;
  public archivo: File | null = null;

  get nombre(): string {
    return this.formCliente.get('nombre')?.value!;
  }

  get apellidoPaterno(): string {
    return this.formCliente.get('apellidoPaterno')?.value!;
  }

  get apellidoMaterno(): string {
    return this.formCliente.get('apellidoMaterno')?.value!;
  }

  get direccion(): string {
    return this.formCliente.get('direccion')?.value!;
  }

  get telefono(): string {
    return this.formCliente.get('telefono')?.value!;
  }

  get correo(): string {
    return this.formCliente.get('correo')?.value!;
  }

  constructor(private clienteService: ClienteService) { }

  async ngOnInit() {
    await this.consultarClientes();
  }

  protected async consultarClientes() {
    await this.clienteService.obtenerClientes()
    .then((respuesta: Cliente[]) => {
      this.listaClientes = respuesta;
    })
    .catch((error: Error) => {
      console.log(error)
    });
  }

  protected async consultarCliente() {
    await this.clienteService.obtenerCliente()
    .then((respuesta: Cliente) => {
      this.cliente = respuesta
    })
    .catch((error: Error) => {
      console.log(error);
    })
  }

  protected async registrarCliente() {
    const cliente: Cliente = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo
    };

    await this.clienteService.registrarCliente(cliente)
    .then(() => {
      console.log('Todo salio bien')
      this.consultarClientes();
      this.formCliente.reset();
    })
    .catch((error: Error) => {
      console.log(error);
      this.formCliente.reset();
      this.consultarClientes();
    });
  }

  protected async cargaMasiva() {
    if(!this.archivo){
      console.log('No se ha encontrado ningun archivo todavia');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivo, this.archivo.name);

    await this.clienteService.cargaMasivaClientes(formData)
    .then(() => {
      this.consultarClientes();
      this.archivo = null;
    })
    .catch((error: Error) => {
      this.consultarClientes();
      this.archivo = null;
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      this.archivo = input.files[0];
      console.log('Archivo seleccionado:', this.archivo);
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }
}
