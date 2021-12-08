import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeadquaterService } from 'src/app/services/headquater.service';
import { ProjectService } from 'src/app/services/project.service';
import { RequestService } from 'src/app/services/request.service';
import { TransportService } from 'src/app/services/transport.service';
import { REQUESTFORMFIELDS } from 'src/app/shared/forms/formErrorsFields/formFields';
import { REQUESTVALIDATIONMESSAGES } from 'src/app/shared/forms/formValidationMessages/validationMessages';
import { MaterialTypes, StateName } from 'src/app/shared/models/enums';
import { Headquater } from 'src/app/shared/models/heaquater';
import { Material } from 'src/app/shared/models/material';
import { Project } from 'src/app/shared/models/project';
import { Request } from 'src/app/shared/models/request';
import { Transport } from 'src/app/shared/models/transport';
import { MaterialList } from 'src/app/shared/models/enums';
import { MaterialType } from 'src/app/shared/models/materialType';
import { TipoService } from 'src/app/services/tipo.service';
import { Tracking } from 'src/app/shared/models/tracking';
import { UserService } from 'src/app/services/user.service';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/shared/models/state';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css']
})
export class RequestDialogComponent implements OnInit {

  @ViewChild('fform') requestFormDirective;


  //Lista de materiales disponibles
  materialsList: string[] = MaterialList;

  requestForm!: FormGroup;
  
  request! : Request;
  
  materialTypesList! : MaterialType[];

  projectList!: Project[];
  transportsList! : Transport[];
  headquatersList! : Headquater[];

  selectedHeadquaterName! : string;
  selectedProjectName! : string;
  selectedTransportName! : string;

  destruir : boolean = false ;
  degauss : boolean = false;
  pasarRecicje : boolean = false;
  separarReciclaje : boolean = false;
  reciclarTodo : boolean = false;

  formErrors = REQUESTFORMFIELDS;
  validationMessages = REQUESTVALIDATIONMESSAGES;

  selectedOperation!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private fb : FormBuilder, 
        private requestService: RequestService,
        private transportService: TransportService,
        private headquaterService: HeadquaterService,
        private projectService: ProjectService,
        private materialTypeService: TipoService,
        private userService: UserService,
        private stateService: StateService,
        private dialogRef: MatDialogRef<RequestDialogComponent>) {

          this.selectedOperation = this.data.operation;
    
    this.request = this.data.object;

          if(this.selectedOperation == 'edit'){
            this.createFormEdit(this.request);
          }else{
            this.createForm();
          }
  }

  ngOnInit(): void {
    
    this.initialize();

    

    
  }

  async initialize(){
    await this.chargeLists();
  }  

  async chargeLists(){
    var projects = await this.projectService.getProjects().toPromise();
    var headquaters = await this.headquaterService.getHeadquaters().toPromise();
    var transports = await this.transportService.getTransports().toPromise();
    var materialTypes = await this.materialTypeService.getTypes().toPromise();

    Promise.all([Project, Headquater, Transport, MaterialType]).then(

    ).catch(data => {
      
    })

    

    if(projects && headquaters && transports && materialTypes){
      
      this.projectList = projects;
      this.headquatersList = headquaters;
      this.transportsList = transports;
      this.materialTypesList = materialTypes;
    }
  }

  createFormEdit(request: Request){
    this.requestForm = this.fb.group({
      referencia : [request.referencia, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      fechaRecogida : [request.fechaRecogida, [Validators.required, Validators.pattern] ],

      horario : [request.horario, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
      comentarioTransporte : [request.comentTransporte,[Validators.required, Validators.pattern] ],

      comentInventario : [request.instrucciones.comentInventario,[Validators.required]],
	    
      observaciones : [request.instrucciones.comentInventario,[Validators.required]],

      headquaterSelect : [request.sede.nombre,[Validators.required]],
      projectSelect: [request.proyecto?request.proyecto.nombre:"", []],
      transportSelect : [request.transporte.nombre,[Validators.required]],

      destruir : [request.instrucciones.destruir],
      degauss : [request.instrucciones.degauss],
      pasarRecicje : [request.instrucciones.pasarReciclaje],
      separarReciclaje : [request.instrucciones.separarReciclaje],
      reciclarTodo : [request.instrucciones.reciclarTodo],

      materiales: this.fb.array([])
    
    });

    this.uploadMaterials();
  }


  createForm(): void{
    this.requestForm = this.fb.group({
      referencia : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      fechaRecogida : ['', [Validators.required, Validators.pattern] ],

      horario : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
      comentarioTransporte : ['',[Validators.required, Validators.pattern] ],

      comentInventario : ['',[Validators.required]],
	   
      observaciones : ['',[Validators.required]],

      // headquaterSelect : ['',[Validators.required]],
      // projectSelect: ['', []],
      // transportSelect : ['',[Validators.required]],

      materiales: this.fb.array([])

    });

    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  ////////////////////////////////
  uploadMaterials() : FormArray{

    
    for(var i=0; i<this.request.materiales.length; i++){
      this.materials().push(
      this.fb.group({
        type: this.request.materiales[i].tipo.tipoMaterial,
        quantity: this.request.materiales[i].cantidad,
      }))
    }

    return this.materials();
  }


  materials() : FormArray {
    return this.requestForm.get("materiales") as FormArray
  }

  newMaterial(): FormGroup {
    return this.fb.group({
      type: '',
      quantity: '',
    })
  }
   
  addMaterials() {
    this.materials().push(this.newMaterial());
  }
   
  removeMaterial(i:number) {
    this.materials().removeAt(i);
  }

////////////////////////////////////////////////////

  onValueChanged(data?: any) {
    if (!this.requestForm) { return; }

    const form = this.requestForm;

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
    this.request.referencia = this.requestForm.controls.referencia.value;
    this.request.fechaRecogida = this.requestForm.controls.fechaRecogida.value;

    this.request.horario = this.requestForm.controls.horario.value;
    this.request.comentTransporte = this.requestForm.controls.comentarioTransporte.value;
    
    
    this.request.instrucciones.degauss = this.degauss;
    this.request.instrucciones.destruir = this.destruir;
    this.request.instrucciones.pasarReciclaje = this.pasarRecicje;
    this.request.instrucciones.separarReciclaje = this.separarReciclaje;
    this.request.instrucciones.reciclarTodo = this.reciclarTodo;
    this.request.instrucciones.comentInventario =this.requestForm.controls.comentInventario.value;
    this.request.instrucciones.observaciones = this.requestForm.controls.observaciones.value;

    this.request.proyecto = this.projectList.find(p => p.nombre == this.selectedProjectName) as Project;
    this.request.sede = this.headquatersList.find(h => h.nombre == this.selectedHeadquaterName) as Headquater;
    this.request.transporte = this.transportsList.find(t => t.nombre == this.selectedTransportName) as Transport;

    const materialsQuantity = this.requestForm.controls.materiales.value;

    for(let i=0; i<materialsQuantity.length; i++){

      var material: Material = new Material();

      // material = new Material(materialsQuantity.at(i).type, materialsQuantity.at(i).quantity);

      // material.tipo.tipoMaterial = materialsQuantity.at(i).type;
      material.tipo = this.materialTypesList.find(e => e.tipoMaterial == materialsQuantity.at(i).type) as MaterialType;
      material.cantidad = materialsQuantity.at(i).quantity;

      this.request.materiales.push(material);
    }
    
    
    this.resetRequestForm();
   
    this.registerRequest();
  }

  resetRequestForm(){

    this.requestForm.reset({
      referencia : '',
      fechaRecogida : '',
      horario : '',
		  comentarioTransporte : '',
      
    });

    this.destruir = false ;
    this.degauss = false;
    this.pasarRecicje = false;
    this.separarReciclaje = false;
    this.reciclarTodo = false;

    this.selectedHeadquaterName = "";
    this.selectedProjectName= "";
    this.selectedTransportName = "";


    this.requestFormDirective.resetForm();

    this.dialogRef.close();
  }


  registerRequest(){
    console.log(this.request);
    var track = new Tracking();

    this.userService.getUser(localStorage.getItem("user") as string).subscribe(data => {
      track.usuario = data;

      track.fecha = new Date();

      this.stateService.getAll().subscribe(data => {
        track.estado = data.find(a => a.idEstado == 1) as State;

        console.log(track.estado)

        this.request.seguimientos.push(track);

        this.requestService.postRequest(this.request).subscribe();
      });

      

      console.log(this.request);

      
     });


    
    
  }

}
