import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';

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
  user: User;
  errorMessage! : string;

  constructor(private fb : FormBuilder,
    private userService: UserService) {

    this.user = new User;
    this.username = "";
    this.password = "";
   }

  ngOnInit(): void {
  }

  logOut(state){
    this.loginSucceful = state;
    console.log(state);
  }

  onSubmit(){
    // this.username = this.loginForm.controls.username.value;
    // this.password = this.loginForm.controls.password.value;

    var loginData = new User();

    //this.user.nombreUsuario = this.username;
    
    loginData.nombreUsuario = this.username;
    loginData.password = this.password;

    this.login(loginData);
  }

  login(user: User){

    console.log("user before")

    this.userService.login(user).toPromise()
    .then(data=> {

        console.log("user after")

        this.user.roles[0].rolNombre = data.authorities[0]?data.authorities[0].authority:"";
        this.user.nombreUsuario = data.nombreUsuario;

        console.log(this.user);

        this.userService.setToken(data.token);

        this.loginSucceful = true;

        localStorage.setItem("role", data.authorities[0] ? data.authorities[0].authority : "TECNICO");
        localStorage.setItem("user", data.nombreUsuario);
        
        console.log(localStorage.getItem("role"));
        
      
    })
    .catch(error => {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    });


   
    // this.userService.login(user).subscribe(data => {
    //   if(data){
    //     console.log(data);

    //     if(data.status == 401){
    //       this.errorMessage = 'Usuario o contraseña incorrectos';
    //     }
        

    //     this.user.roles[0].rolNombre = data.authorities[0]?data.authorities[0].authority:"";
    //     this.user.nombreUsuario = data.nombreUsuario;

    //     console.log(this.user);

    //     this.userService.setToken(data.token);

    //     this.loginSucceful = true;

    //     localStorage.setItem("role", data.authorities[0] ? data.authorities[0].authority : "TECNICO");
    //     localStorage.setItem("user", data.nombreUsuario);
        
    //     console.log(localStorage.getItem("role"))
    //   }
    // });

   
    //Llamamos a la api para comprobar datos
    //Si el login es correcto mostramos la app
    
  }

}
