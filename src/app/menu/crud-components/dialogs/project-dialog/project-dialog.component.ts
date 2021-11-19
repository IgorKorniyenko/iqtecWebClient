import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
import { Client } from 'src/app/shared/models/client';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  @ViewChild('fform') projectFormDirective;

  headquaterForm!: FormGroup;
  
  clientsList! : Client[];
  selectedClientName!: string;

  project!: Project;

  formErrors = PROJECTFORMFIELDS;
  validationMessages = PROJECTVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private projectService: ProjectService,
        private clientService: ClientService) {


          this.clientService.getClients().subscribe(data => {
            this.clientsList = data;
          });
      
          this.selectedOperation = this.data.operation;
          
          this.project = this.data.object;

          if(this.selectedOperation == 'edit'){
            this.createFormEdit(this.project);
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

    
    this.toServerHeadquater();
  }

  toServerHeadquater(){
    console.log(this.selectedClientName);

    //this.headquaterService.postHeadquater(this.headquater).subscribe();

    this.clientService.getClient(this.selectedClientName).subscribe(data => {
      this.headquater.cliente = data;


    if(this.selectedOperation == 'edit'){
      this.headquaterService.putHeadquater(this.headquater).subscribe();
    }else{
      this.headquaterService.postHeadquater(this.headquater).subscribe();
    }

    });
    
  }

}
