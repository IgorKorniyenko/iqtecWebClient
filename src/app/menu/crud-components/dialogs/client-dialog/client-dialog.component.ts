import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { Client } from '../../../../shared/models/client';

import { CLIENTVALIDATIONMESSAGES } from '../../../../shared/forms/formValidationMessages/validationMessages';
import { CLIENTFORMFIELDS } from '../../../../shared/forms/formErrorsFields/formFields';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  @ViewChild('fform') clienteFormDirective;

  clientForm!: FormGroup;
  
  client! : Client;

  formErrors = CLIENTFORMFIELDS;
  validationMessages = CLIENTVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb : FormBuilder, private clienteService : ClientService) { 
    
    this.selectedOperation = this.data.operation;
    
    this.client = this.data.object;

    if(this.selectedOperation == 'edit'){
      this.createFormEdit(this.client);
    }else{
      this.createForm();
    }
  }

  ngOnInit(): void {
   

    // if(this.selectedOperation == 'edit'){
    //   this.createFormEdit(this.client);
    // }
  }

  createFormEdit(client : Client){
    this.clientForm = this.fb.group({
      nombre : [client.razonSocial, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cif : [client.cif, [Validators.required, Validators.pattern] ],

      calle : [client.direccion.calle, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
      cp : [client.direccion.cp,[Validators.required, Validators.pattern] ],
      poblacion : [client.direccion.poblacion, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      provincia : [client.direccion.provincia, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      pais : [client.direccion.pais, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],

      contactoPrin : [client.listaContactos[0].nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(40)] ],
      tlfPrin : [client.listaContactos[0].telefono1, [Validators.required, Validators.pattern] ],
      movilPrin : [client.listaContactos[0].telefono2, [Validators.required, Validators.pattern] ],
      mailPrin : [client.listaContactos[0].email, [Validators.required, Validators.email] ],

      contactoSec : [client.listaContactos[1]?client.listaContactos[1].nombre:'', [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : [client.listaContactos[1]?client.listaContactos[1].telefono1:'', [Validators.pattern] ],
      movilSec : [client.listaContactos[1]?client.listaContactos[1].telefono2:'', [Validators.pattern] ],
      mailSec : [client.listaContactos[1]?client.listaContactos[1].email:'', [Validators.email] ]

    });
  }


  createForm(): void{
    this.clientForm = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cif : ['', [Validators.required, Validators.pattern] ],
      calle : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
		  cp : ['',[Validators.required, Validators.pattern] ],
      poblacion : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      provincia : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      pais : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      contactoPrin : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)] ],
      tlfPrin : ['', [Validators.required, Validators.pattern] ],
      movilPrin : ['', [Validators.required, Validators.pattern] ],
      mailPrin : ['', [Validators.required, Validators.email] ],
      contactoSec : ['', [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : ['', [Validators.pattern] ],
      movilSec : ['', [Validators.pattern] ],
      mailSec : ['', [Validators.email] ]

    });

    this.clientForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.clientForm) { return; }

    const form = this.clientForm;

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
    this.client.razonSocial = this.clientForm.controls.nombre.value;
    this.client.cif = this.clientForm.controls.cif.value;

    this.client.direccion.calle = this.clientForm.controls.calle.value;
    this.client.direccion.cp = this.clientForm.controls.cp.value;
    this.client.direccion.pais = this.clientForm.controls.pais.value;
    this.client.direccion.poblacion = this.clientForm.controls.poblacion.value;
    this.client.direccion.provincia = this.clientForm.controls.provincia.value;

    this.client.listaContactos[0].nombre = this.clientForm.controls.contactoPrin.value;
    this.client.listaContactos[0].telefono1 = this.clientForm.controls.tlfPrin.value;
    this.client.listaContactos[0].email = this.clientForm.controls.mailPrin.value;
    this.client.listaContactos[0].telefono2 = this.clientForm.controls.movilPrin.value;
    this.client.listaContactos[1].nombre = this.clientForm.controls.contactoSec.value;
    this.client.listaContactos[1].telefono1 = this.clientForm.controls.tlfSec.value;
    this.client.listaContactos[1].email = this.clientForm.controls.mailSec.value;
    this.client.listaContactos[1].telefono2 = this.clientForm.controls.movilSec.value;
  

    this.clientForm.reset({
      nombre : '',
      cif : '',
      calle : '',
		  cp : '',
      poblacion : '',
      provincia : '',
      pais : '',
      contactoPrin : '',
      tlfPrin : '',
      movilPrin : '',
      mailPrin : '',
      contactoSec : '',
      tlfSec : '',
      movilSec : '',
      mailSec : ''
    });

    this.clienteFormDirective.resetForm();

    this.registerUser();
    console.log(this.client.listaContactos[0].email);
  }

  registerUser(){
    this.clientForm.value
    console.log(this.clienteService.getClients());
    this.clienteService.postCliente(this.client).subscribe();
  }

}


