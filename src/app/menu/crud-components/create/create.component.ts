import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../shared/models/client';

import { CLIENTVALIDATIONMESSAGES } from '../../../shared/forms/formValidationMessages/clientValidationMessages';
import { CLIENTFORMFIELDS } from '../../../shared/forms/formErrorsFields/clientFormFields';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('fform') clienteFormDirective;

  clientForm!: FormGroup;
  client! : Client;

  //El tipo de formulario seleccionado, si es cliente, sede, etc..
  @Input()
  selectedFormType : string = '';

  //Se cargan de un archivo externo los campos del formulario que pueden tener errores y sus mensajes
  formErrors = CLIENTFORMFIELDS;
  validationMessages = CLIENTVALIDATIONMESSAGES;

  constructor(private fb : FormBuilder, private clienteService : ClientService) {
    this.createForm();
    
   }

  ngOnInit(): void {
    this.client = new Client();
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
