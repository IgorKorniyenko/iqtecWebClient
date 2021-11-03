import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../shared/models/client';
import { Headquater } from '../../../shared/models/heaquater';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //Listas de objetos que seran cargados de la API al cargar el componente
  //De dicha lista se podra elegir el que deseamos para eliminarlo
  clients! : Client[];
  headquaters! : Headquater[];

  //Variable que guarda el tipo de borrado que queremos hacer (cliente, sede, etc)
  @Input()
  selectedFormType : string = "";
  //Tipo de borrado que vamos a hacer traducido a castellano
  translatedType : string = "";

  //Clave por la que buscamos al objeto que queremos borar
  inputKey : string = "";

  //Objetos que seran rellenados cuando haya uno que buscamos en la base de datos
  client! : Client;

  constructor(private clientService : ClientService) { 
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    })

    this.translateType();
  }


  //Funcion que traduce el tipo de borrado a castellano
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


  //Funcion que hace una peticion a la api buscando el objeto por una clave
  search(name : string) {
    switch (this.selectedFormType){
      case "client" : 
              this.clientService.getClients().subscribe(data => {
                this.clients = data;
              })

              this.client = <Client>this.clients.find(e => e.razonSocial === name);
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

}
