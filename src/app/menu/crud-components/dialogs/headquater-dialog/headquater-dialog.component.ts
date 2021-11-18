import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { HeadquaterService } from 'src/app/services/headquater.service';
import { HEADQUATERFORMFIELDS } from 'src/app/shared/forms/formErrorsFields/formFields';
import { HEADQUATERVALIDATIONMESSAGES } from 'src/app/shared/forms/formValidationMessages/validationMessages';
import { Client } from 'src/app/shared/models/client';
import { Headquater } from 'src/app/shared/models/heaquater';

@Component({
  selector: 'app-headquater-dialog',
  templateUrl: './headquater-dialog.component.html',
  styleUrls: ['./headquater-dialog.component.css']
})
export class HeadquaterDialogComponent implements OnInit {

  @ViewChild('fform') headquaterFormDirective;

  headquaterForm!: FormGroup;
  
  headquater! : Headquater;
  clientsList! : Client[];
  selectedClientName!: string;

  formErrors = HEADQUATERFORMFIELDS;
  validationMessages = HEADQUATERVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private headquaterService: HeadquaterService,
        private clientService: ClientService) {


          this.clientService.getClients().subscribe(data => {
            this.clientsList = data;
          });
      
          this.selectedOperation = this.data.operation;
          
          this.headquater = this.data.object;

          console.log(this.headquater)

          if(this.selectedOperation == 'edit'){
            this.createFormEdit(this.headquater);
          }else{
            this.createForm();
          }
  }

  ngOnInit(): void {
    

    // if(this.selectedOperation == 'edit'){
    //   this.createFormEdit(this.headquater);
    // }
  }

  createFormEdit(headquater: Headquater){
    console.log(headquater)
    this.headquaterForm = this.fb.group({
      nombre : [headquater.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cif : [headquater.cif, [Validators.required, Validators.pattern] ],

      calle : [headquater.direccion.calle, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
      cp : [headquater.direccion.cp,[Validators.required, Validators.pattern] ],
      poblacion : [headquater.direccion.poblacion, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      provincia : [headquater.direccion.provincia, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      pais : [headquater.direccion.pais, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],

      contactoPrin : [headquater.listaContactos[0].nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(40)] ],
      tlfPrin : [headquater.listaContactos[0].telefono1, [Validators.required, Validators.pattern] ],
      movilPrin : [headquater.listaContactos[0].telefono2, [Validators.required, Validators.pattern] ],
      mailPrin : [headquater.listaContactos[0].email, [Validators.required, Validators.email] ],

      contactoSec : [headquater.listaContactos[1]?headquater.listaContactos[1].nombre:'', [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : [headquater.listaContactos[1]?headquater.listaContactos[1].telefono1:'', [Validators.pattern] ],
      movilSec : [headquater.listaContactos[1]?headquater.listaContactos[1].telefono2:'', [Validators.pattern] ],
      mailSec : [headquater.listaContactos[1]?headquater.listaContactos[1].telefono1:'', [Validators.email] ],

      clientSelect : [headquater.cliente.razonSocial, []]

    });
  }


  createForm(): void{
    this.headquaterForm = this.fb.group({
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
      mailSec : ['', [Validators.email] ],
      clientSelect : ['', []]

    });

    this.headquaterForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.headquaterForm) { return; }

    const form = this.headquaterForm;

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
    this.headquater.nombre = this.headquaterForm.controls.nombre.value;
    this.headquater.cif = this.headquaterForm.controls.cif.value;

    this.headquater.direccion.calle = this.headquaterForm.controls.calle.value;
    this.headquater.direccion.cp = this.headquaterForm.controls.cp.value;
    this.headquater.direccion.pais = this.headquaterForm.controls.pais.value;
    this.headquater.direccion.poblacion = this.headquaterForm.controls.poblacion.value;
    this.headquater.direccion.provincia = this.headquaterForm.controls.provincia.value;

    this.headquater.listaContactos[0].nombre = this.headquaterForm.controls.contactoPrin.value;
    this.headquater.listaContactos[0].telefono1 = this.headquaterForm.controls.tlfPrin.value;
    this.headquater.listaContactos[0].email = this.headquaterForm.controls.mailPrin.value;
    this.headquater.listaContactos[0].telefono2 = this.headquaterForm.controls.movilPrin.value;

    this.selectedClientName = this.headquaterForm.controls.clientSelect.value;
    

    
  

    this.headquaterForm.reset({
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

    this.headquaterFormDirective.resetForm();

    this.registerHeadquater();
  }

  registerHeadquater(){
    console.log(this.selectedClientName);

    //this.headquaterService.postHeadquater(this.headquater).subscribe();

    this.clientService.getClient(this.selectedClientName).subscribe(data => {
      this.headquater.cliente = data;

      console.log(this.headquater.cliente.idCliente);

      this.headquaterService.postHeadquater(this.headquater).subscribe();
    });
    
  }


}
