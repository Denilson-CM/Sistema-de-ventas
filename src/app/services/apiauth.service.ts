import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Login } from "../models/login";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ApiauthService {
  url: string = 'http://localhost:51777/api/User/login';

  private usuarioSubject!: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  public get usuarioData(): Usuario{
    return this.usuarioSubject.value;
  }

  constructor(private _http: HttpClient){
    //Obtener de localStorage del usuario
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));

    this.usuario = this.usuarioSubject.asObservable();
  }
  
  //Models/login.service que regresa email y password
  login(login: Login): Observable<Response>{
    return this._http.post<Response>(this.url, login, httpOption).pipe(
      map(res => {
        //Si es exito la sesion se guarda
        if(res.exito.toString() === '1'){
          const usuario: Usuario = res.data;
          //Guaedar en el localStorage
          //Suscri de nuevo usuario
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
        }
        return res;
      })
    );        
  }

  //Cerrar sesión
  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}