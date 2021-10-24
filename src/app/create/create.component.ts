import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../shared/models/client';

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


  formErrors = {
    'nombre': '',
    'cif': '',
    'pais': '',
    'calle' : '',
    'provincia': '',
    'cp': '',
    'poblacion': '',
    'contactoPrin': '',
    'tlfPrin': '',
    'movilPrin': '',
    'mailPrin': '',
    'contactoSec': '',
    'tlfSec': '',
    'movilSec': '',
    'mailSec': ''
  };

  validationMessages = {
    'nombre': {
      'required':      'Nombre o razon social es requerido.',
      'minlength':     'Nombre o razon social tiene que tener al menos 2 caracteres.',
      'maxlength':     'Nombre o razon social puede tener 25 caracteres como maximo.'
    },
    'cif': {
      'required':      'Cif requerido.',
      'pattern':       'Formato de cif no valido.'
    },
    'calle': {
      'required':      'Calle es requerida.',
      'minlength':     'Calle tiene que tener al menos 2 caracteres.',
      'maxlength':     'Calle puede tener 40 caracteres como maximo.'
    },
    'pais': {
      'required':      'Pais es requerido.',
      'minlength':     'Pais tiene que tener al menos 2 caracteres.',
      'maxlength':     'Pais puede tener 25 caracteres como maximo.'
    },
    'provincia': {
      'required':      'Provincia es requerida.',
      'minlength':     'Provincia tiene que tener al menos 2 caracteres.',
      'maxlength':     'Provincia puede tener 25 caracteres como maximo.'
    },
    'cp': {
      'required':      'Codigo postal requerido.',
      'pattern':       'Solo admite numeros.'
    },
    'poblacion': {
      'required':      'Poblacion es requerida.',
      'minlength':     'Poblacion tiene que tener al menos 2 caracteres.',
      'maxlength':     'Poblacion puede tener 25 caracteres como maximo.'
    },
    'contactoPrin': {
      'required':      'Contacto principal es requerido.',
      'minlength':     'Contacto principal tiene que tener al menos 2 caracteres.',
      'maxlength':     'Contacto principal puede tener 40 caracteres como maximo.'
    },
    'tlfPrin': {
      'required':      'Telefono principal es requerido.',
      'pattern':       'Solo admite numeros.'
    },
    'movilPrin': {
      'required':      'Movil principal es requerido.',
      'pattern':       'Solo admite numeros.'
    },
    'mailPrin': {
      'required':      'Correo principal es requerido.',
      'pattern':       'Formato incorrecto.'
    },
  };

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
    this.client.nombre = this.clientForm.controls.nombre.value;
    this.client.cif = this.clientForm.controls.cif.value;

    this.client.direccion.calle = this.clientForm.controls.calle.value;
    this.client.direccion.cp = this.clientForm.controls.cp.value;
    this.client.direccion.pais = this.clientForm.controls.pais.value;
    this.client.direccion.poblacion = this.clientForm.controls.poblacion.value;
    this.client.direccion.provincia = this.clientForm.controls.provincia.value;

    this.client.contacto.contactoPrin = this.clientForm.controls.contactoPrin.value;
    this.client.contacto.tlfPrin = this.clientForm.controls.tlfPrin.value;
    this.client.contacto.mailPrin = this.clientForm.controls.mailPrin.value;
    this.client.contacto.movilPrin = this.clientForm.controls.movilPrin.value;
    this.client.contacto.contactoSec = this.clientForm.controls.contactoSec.value;
    this.client.contacto.tlfSec = this.clientForm.controls.tlfSec.value;
    this.client.contacto.mailSec = this.clientForm.controls.mailSec.value;
    this.client.contacto.movilSec = this.clientForm.controls.movilSec.value;
  

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
  }

  registerUser(){
    this.clientForm.value
    console.log(this.clienteService.getClients());
    this.clienteService.postCliente(this.client);
    console.log(this.client.nombre);
  }
}
