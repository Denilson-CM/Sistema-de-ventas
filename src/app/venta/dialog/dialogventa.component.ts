import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Concepto } from "src/app/models/concepto";
import { Venta } from "src/app/models/venta";
import { ApiventaService } from "src/app/services/apiventa.service";

@Component({
    templateUrl: 'dialogventa.component.html'
})

export class DialogVentaComponent {

    public venta: Venta;
    public concepto: Concepto[];

    //Validación de formulario
    public conceptoForm = this.formBuilder.group({
        cantidad: [0, Validators.required],
        importe: [0, Validators.required],
        idProducto: [0, Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<DialogVentaComponent>,
        public snackBar: MatSnackBar,
        public apiVenta: ApiventaService,
        private formBuilder: FormBuilder,
    ) {
        this.concepto = [];
        this.venta = {idCliente: 3, conceptos: []};
     }

    close(){
        this.dialogRef.close();
    }

    addConcepto(){
        this.concepto.push(this.conceptoForm.value);
    }

    addVenta(){
        this.venta.conceptos = this.concepto;
        this.apiVenta.add(this.venta).subscribe(response =>{
            console.log(this.venta.conceptos);
            if(response.exito.toString() === '1'){
                this.dialogRef.close();
                this.snackBar.open('Venta hecha con éxito','',{
                    duration: 2000
                });
            }
        });
    }
}