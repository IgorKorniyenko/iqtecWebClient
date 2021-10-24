import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Client } from '../shared/models/client';
import { Searchable } from '../shared/models/searchable';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  selectedFormType! : string;
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
  constructor(private fb : FormBuilder) { 
  }

  ngOnInit(): void {
    this.translateType();
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
      //Se llama al servicio para que busque al cliente/sede/transporte...
      //Nos rellena el objeto

      switch (this.selectedFormType){
        case "client" : 
                //Hacemos la llamada al servicio de cliente
                //Si encuentra al cliente, lo cargamos a una variable
                //Mostramos un formulario rellenado con los datos del cliente encontrado
                this.createClientForm(new Client());

                this.objectIsPresent = true;
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
      nombre : [client.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cif : [client.cif, [Validators.required, Validators.pattern] ],
      calle : [client.direccion.calle, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]  ],
		  cp : [client.direccion.cp,[Validators.required, Validators.pattern] ],
      poblacion : [client.direccion.poblacion, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      provincia : [client.direccion.provincia, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      pais : [client.direccion.pais, [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      contactoPrin : [client.contacto.contactoPrin, [Validators.required, Validators.minLength(2), Validators.maxLength(40)] ],
      tlfPrin : [client.contacto.tlfPrin, [Validators.required, Validators.pattern] ],
      movilPrin : [client.contacto.movilPrin, [Validators.required, Validators.pattern] ],
      mailPrin : [client.contacto.mailPrin, [Validators.required, Validators.email] ],
      contactoSec : [client.contacto.contactoSec, [Validators.minLength(2), Validators.maxLength(40 )] ],
      tlfSec : [client.contacto.tlfSec, [Validators.pattern] ],
      movilSec : [client.contacto.movilSec, [Validators.pattern] ],
      mailSec : [client.contacto.mailSec, [Validators.email] ]

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
  }

}
