import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
import { PROJECTFORMFIELDS } from 'src/app/shared/forms/formErrorsFields/formFields';
import { PROJECTVALIDATIONMESSAGES } from 'src/app/shared/forms/formValidationMessages/validationMessages';
import { Client } from 'src/app/shared/models/client';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  @ViewChild('fform') projectFormDirective;

  projectForm!: FormGroup;
  
  clientsList! : Client[];
  selectedClientName!: string;

  project!: Project;

  formErrors = PROJECTFORMFIELDS;
  validationMessages = PROJECTVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private projectService: ProjectService,
        private clientService: ClientService,
        private dialogRef: MatDialogRef<ProjectDialogComponent>) {


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

  createFormEdit(project: Project){
    console.log(project)
    this.projectForm = this.fb.group({
      nombre : [project.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      descripcion : [project.descripcion, [Validators.required] ],

      clientSelect : [project.cliente.razonSocial, []]

    });
  }


  createForm(): void{
    this.projectForm = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      descripcion : ['', [Validators.required] ],

      clientSelect : ['', []]

    });

    this.projectForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.projectForm) { return; }

    const form = this.projectForm;

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
    this.project.nombre = this.projectForm.controls.nombre.value;
    this.project.descripcion = this.projectForm.controls.descripcion.value;

    this.selectedClientName = this.projectForm.controls.clientSelect.value;
    

    this.projectForm.reset({
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

    this.projectFormDirective.resetForm();

    
    this.toServerProject();

    this.dialogRef.close();
  }

  toServerProject(){
    console.log(this.selectedClientName);

    //this.headquaterService.postHeadquater(this.headquater).subscribe();

    this.clientService.getClient(this.selectedClientName).subscribe(data => {
      this.project.cliente = data;


    if(this.selectedOperation == 'edit'){
      this.projectService.putProject(this.project).subscribe();
    }else{
      this.projectService.postProject(this.project).subscribe();
    }

    });
    
  }

}
