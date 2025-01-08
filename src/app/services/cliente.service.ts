import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { lastValueFrom } from 'rxjs';
import { constants } from '../../env/constants';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public async registrarCliente(cliente: Cliente) {
    const options = {
      headers: {'Content-Type': 'application/json'},
    };

    return lastValueFrom(this.http.post(constants.urlServicios + 'agregarCliente', cliente, options));
  }

  public async cargaMasivaClientes(formData: FormData) {
    const options = {
    };

    return lastValueFrom(this.http.post(constants.urlServicios + 'cargaMasiva', formData, options));
  }

  public async obtenerCliente() {
    const options = {
      headers: {'Content-Type': 'application/json'},
    };

    return lastValueFrom(this.http.get(constants.urlServicios + 'obtenerCliente', options));
  }

  public async obtenerClientes(): Promise<Cliente[]> {
    const options = {
      headers: {'Content-Type': 'application/json'},
    };

    return lastValueFrom(this.http.get<Cliente[]>(constants.urlServicios + 'obtenerClientes', options));
  }
}
