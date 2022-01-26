import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public apiauthService: ApiauthService,
              private router: Router,
              private formBuilder: FormBuilder,
              public snackBar: MatSnackBar
    ) {
    //Direccionar a home se tiene sesión
    // if(this.apiauthService.usuarioData){
    //   this.router.navigate(['/']);
    // }
  }

  //nota: quitas el void en caso de fallo
  ngOnInit(): void {
  }

  login(){
    this.apiauthService.login(this.loginForm.value).subscribe(response =>{
        
          this.router.navigate(['/']);
          this.snackBar.open('Iniciando sesión...','',{
            duration: 2000
          });
        
    });
  }

}
