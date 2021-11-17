import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransportService } from 'src/app/services/transport.service';
import { TRANSPORTFORMFIELDS } from 'src/app/shared/forms/formErrorsFields/formFields';
import { TRANSPORTVALIDATIONMESSAGES } from 'src/app/shared/forms/formValidationMessages/validationMessages';
import { Transport } from 'src/app/shared/models/transport';

@Component({
  selector: 'app-transport-dialog',
  templateUrl: './transport-dialog.component.html',
  styleUrls: ['./transport-dialog.component.css']
})
export class TransportDialogComponent implements OnInit {

  @ViewChild('fform') transportFormDirective;

  transportForm!: FormGroup;
  
  transport! : Transport;

  formErrors = TRANSPORTFORMFIELDS;
  validationMessages = TRANSPORTVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private transportService: TransportService) {

          if(this.selectedOperation == 'edit'){
            this.createFormEdit(this.transport);
          }else{
            this.createForm();
          }
  }

  ngOnInit(): void {
    
    this.selectedOperation = this.data.operation;
    
    this.transport = this.data.object;

    if(this.selectedOperation == 'edit'){
      this.createFormEdit(this.transport);
    }
  }

  createFormEdit(transport: Transport){
    this.transportForm = this.fb.group({
      nombre : [transport.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cif : [transport.cif, [Validators.required, Validators.pattern] ],

      calle : [transport.direccion.calle, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
      cp : [transport.direccion.cp,[Validators.required, Validators.pattern] ],
      poblacion : [transport.direccion.poblacion, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      provincia : [transport.direccion.provincia, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      pais : [transport.direccion.pais, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],

      contactoPrin : [transport.listaContactos[0].nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(40)] ],
      tlfPrin : [transport.listaContactos[0].telefono1, [Validators.required, Validators.pattern] ],
      movilPrin : [transport.listaContactos[0].telefono2, [Validators.required, Validators.pattern] ],
      mailPrin : [transport.listaContactos[0].email, [Validators.required, Validators.email] ],

      contactoSec : [transport.listaContactos[1].nombre, [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : [transport.listaContactos[1].telefono1, [Validators.pattern] ],
      movilSec : [transport.listaContactos[1].telefono2, [Validators.pattern] ],
      mailSec : [transport.listaContactos[1].email, [Validators.email] ]

    });
  }


  createForm(): void{
    this.transportForm = this.fb.group({
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

    this.transportForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.transportForm) { return; }

    const form = this.transportForm;

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
    this.transport.nombre = this.transportForm.controls.nombre.value;
    this.transport.cif = this.transportForm.controls.cif.value;

    this.transport.direccion.calle = this.transportForm.controls.calle.value;
    this.transport.direccion.cp = this.transportForm.controls.cp.value;
    this.transport.direccion.pais = this.transportForm.controls.pais.value;
    this.transport.direccion.poblacion = this.transportForm.controls.poblacion.value;
    this.transport.direccion.provincia = this.transportForm.controls.provincia.value;

    this.transport.listaContactos[0].nombre = this.transportForm.controls.contactoPrin.value;
    this.transport.listaContactos[0].telefono1 = this.transportForm.controls.tlfPrin.value;
    this.transport.listaContactos[0].email = this.transportForm.controls.mailPrin.value;
    this.transport.listaContactos[0].telefono2 = this.transportForm.controls.movilPrin.value;

    

    
  

    this.transportForm.reset({
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
      clientSelect : ''
    });

    this.transportFormDirective.resetForm();

    this.registerTransport();
  }

  registerTransport(){

    this.transportService.postTransport(this.transport).subscribe();
    
  }


}

