import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Cliente } from '../shared/models/cliente';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  @ViewChild('fform') clienteFormDirective;

  clienteForm!: FormGroup;
  cliente! : Cliente;


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
    this.cliente = new Cliente();
  }

  createForm(): void{
    this.clienteForm = this.fb.group({
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

    this.clienteForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.clienteForm) { return; }

    const form = this.clienteForm;

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
    this.cliente.nombre = this.clienteForm.controls.nombre.value;
    this.cliente.cif = this.clienteForm.controls.cif.value;

    this.cliente.direccion.calle = this.clienteForm.controls.calle.value;
    this.cliente.direccion.cp = this.clienteForm.controls.cp.value;
    this.cliente.direccion.pais = this.clienteForm.controls.pais.value;
    this.cliente.direccion.poblacion = this.clienteForm.controls.poblacion.value;
    this.cliente.direccion.provincia = this.clienteForm.controls.provincia.value;

    this.cliente.contacto.contactoPrin = this.clienteForm.controls.contactoPrin.value;
    this.cliente.contacto.tlfPrin = this.clienteForm.controls.tlfPrin.value;
    this.cliente.contacto.mailPrin = this.clienteForm.controls.mailPrin.value;
    this.cliente.contacto.movilPrin = this.clienteForm.controls.movilPrin.value;
    this.cliente.contacto.contactoSec = this.clienteForm.controls.contactoSec.value;
    this.cliente.contacto.tlfSec = this.clienteForm.controls.tlfSec.value;
    this.cliente.contacto.mailSec = this.clienteForm.controls.mailSec.value;
    this.cliente.contacto.movilSec = this.clienteForm.controls.movilSec.value;
  

    this.clienteForm.reset({
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
    this.clienteForm.value
    console.log(this.clienteService.getClients());
    this.clienteService.postCliente(this.cliente);
    console.log(this.cliente.nombre);
  }
}
