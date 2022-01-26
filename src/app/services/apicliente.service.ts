//CONEXION A LOS SERVICIOS DE CLIENTE

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string = 'http://localhost:51777/api/Cliente';

  constructor(
    private _http: HttpClient
  ) { }

  //Recuperar datos
  getClientes(): Observable<Response> {
    return this._http.get<Response>(this.url);
  }

  //Insertar datos
  add(cliente: Cliente): Observable<Response> {
    return this._http.post<Response>(this.url, cliente, httpOption);
  }

  //Editar datos
  edit(cliente: Cliente): Observable<Response> {
    return this._http.put<Response>(this.url, cliente, httpOption);
  }

  //Eliminar datos
  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
}
