import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import {DialogClienteComponent} from './dialog/dialogcliente.component';
import {MatDialog} from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst: any[] = [];
  //Columnas a mostrar por Material
  public columnas: string[] = ['id','nombre', 'actions'];
  readonly width: string = '300px';

  constructor(
     //Inyectar ApiclienteService
     private apiCliente: ApiclienteService,
     public dialog: MatDialog,
     public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    //Observable = subscribe
    //respose representa el elemento que regreso el servicio
    this.apiCliente.getClientes().subscribe( response =>{
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes();
    });
  }

  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width, 
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes();
    });
  }
  
  delete(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result) {
        this.apiCliente.delete(cliente.id).subscribe(response => {
          if(response.exito.toString() === '1'){
            this.snackBar.open('Cliente eliminado con exito', '', {
              duration: 2000
            });
            this.getClientes();
          }
        });
      }
    });
  }
  
}
