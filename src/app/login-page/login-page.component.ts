import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;
  username : string;
  password : string;
  loginSucceful : boolean = false;

  constructor(private fb : FormBuilder) {
    this.createForm();
    this.username = "";
    this.password = "";
   }

  ngOnInit(): void {
  }

  createForm(){
    this.loginForm = this.fb.group({
      username : [''],
      password : ['']
    });
  }

  onSubmit(){
    this.username = this.loginForm.controls.username.value;
    this.password = this.loginForm.controls.password.value;

    this.loginForm.reset({
      username : '',
      password : ''
    });

    this.loginUser();
  }

  loginUser(){
    //Llamamos a la api para comprobar datos
    //Si el login es correcto mostramos la app
    this.loginSucceful = true;
  }

}
