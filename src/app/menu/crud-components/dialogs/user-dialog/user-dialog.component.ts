import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { USERFORMFIELDS } from 'src/app/shared/forms/formErrorsFields/formFields';
import { USERVALIDATIONMESSAGES } from 'src/app/shared/forms/formValidationMessages/validationMessages';
import { RoleName } from 'src/app/shared/models/enums';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  @ViewChild('fform') userFormDirective;

  userForm!: FormGroup;
  
  user! : User;

  selectedRoleName! : string;
  roleTypes: string[] = ["TECNICO", "ADMINISTRADOR"];

  formErrors = USERFORMFIELDS;
  validationMessages = USERVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private userService: UserService,
        private dialogRef: MatDialogRef<UserDialogComponent>) {

          this.selectedOperation = this.data.operation;
    
          this.user = this.data.object;

          if(this.selectedOperation == 'edit'){
            this.createFormEdit(this.user);
          }else{
            this.createForm();
          }
  }

  ngOnInit(): void {
    
  }

  
  createFormEdit(user: User){

    console.log(user)
    this.userForm = this.fb.group({
      nombreUsuario : [user.nombreUsuario, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password : [user.password, [Validators.required, Validators.pattern] ],

      rol : [user.roles[0]?user.roles[0].rolNombre : "", [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ]
    
    });
  }


  createForm(): void{
    this.userForm = this.fb.group({
      nombreUsuario : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password : ['', [Validators.required, Validators.pattern] ],

      rol : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ]

    });

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }

    const form = this.userForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.user.nombreUsuario = this.userForm.controls.nombreUsuario.value;
    this.user.password = this.userForm.controls.password.value;

    console.log(this.userForm.controls.rol.value)
    this.user.roles[0].rolNombre = this.userForm.controls.rol.value ;
    
    
    this.resetUserForm();
   
    this.registerUser();

    this.dialogRef.close();
  }

  resetUserForm(){

    this.userForm.reset({
      nombreUsuario : '',
      password : '',

      rol : ''
      
    });

    this.userFormDirective.resetForm();
  }


  registerUser(){
    let newUser = {
      "nombreUsuario" : this.user.nombreUsuario,
      "password" : this.user.password,
      "roles" : [this.user.roles[0].rolNombre == "ADMINISTRADOR"? "admin":""]
       
   }

    this.userService.postUser(newUser).subscribe();
    
  }

}
