import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Client } from '../shared/models/client';
import { Searchable } from '../shared/models/searchable';
import { ClientService } from '../services/client.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  selectedFormType! : string;
  //Tipo de formulario seleccionado traducido al castellano para mostrar como titulo del formulario
  translatedType! : string;
  // searchedObject! : Searchable;

  //Campo de busqueda
  inputKey! : string;
  //Variable que nos indica que el objeto es encontrado
  objectIsPresent : boolean = false;

  //Objetos 
  client! : Client;

  //Formularios
  clientForm! : FormGroup;
  headquatersForm! : FormGroup;
  projectForm!: FormGroup;
  transportForm! : FormGroup;
  requestForm! : FormGroup;

  //Se inyectan los servicios de todas las clases que se puedan buscar
  constructor(private fb : FormBuilder, private clienteService : ClientService) { 
  }

  ngOnInit(): void {
    this.translateType();
    this.client = new Client();
  }

  translateType() {
    switch (this.selectedFormType){
      case "client" : 
              this.translatedType = "cliente";
              break;
      case "request" :
              this.translatedType = "solicitud";
              break;
      case "transport" :
              this.translatedType = "transporte";
              break;
      case "headquarters" : 
              this.translatedType = "sede";
              break;
      case "project" : 
              this.translatedType = "proyecto";
              break;
    }
  }

  search(name : string) {

      switch (this.selectedFormType){
        case "client" : 
        
                //Hacemos la llamada al servicio de cliente
                this.clienteService.getClient(name).subscribe(data => {
                        this.client = data
                        console.log(this.client.razonSocial);


                        if(this.client != undefined){
                                console.log(this.client.listaContactos[0].email);
                                this.createClientForm(this.client);
        
                                this.objectIsPresent = true;
                        }else{
        
        
                                this.objectIsPresent = false;
                        }
                });

                
                break;
        case "request" :
                break;
        case "transport" :
                break;
        case "headquarters" : 
                break;
        case "project" : 
                break;
      }
  }

  createClientForm(client : Client){
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

      contactoSec : [client.listaContactos[1].nombre, [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : [client.listaContactos[1].telefono1, [Validators.pattern] ],
      movilSec : [client.listaContactos[1].telefono2, [Validators.pattern] ],
      mailSec : [client.listaContactos[1].email, [Validators.email] ]

    });
  }

  onSubmit(){
    switch (this.selectedFormType){
      case "client" : 
              this.resetClientForm();
              break;
      case "request" :
              break;
      case "transport" :
              break;
      case "headquarters" : 
              break;
      case "project" : 
              break;
    }
  }

  resetClientForm(){
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
  }

}
