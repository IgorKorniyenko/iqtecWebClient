import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';

import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

//Componente tabla en el cual se mostrara el listado de usuarios, seguimiento, etc.
//Se reutilizara en los componentes de visualizar, borrar y editar
export class TableComponent implements OnInit {

  //Listado de clientes que se mostrara al abrir el componente
  @Input()
  // clients : Client[] = [
  //                         {"idCliente":1,
  //                         "razonSocial":"Jose",
  //                         "cif":"78913712f",
  //                         "direccion":{
  //                                       "calle":"tiscar",
  //                                       "cp":"28911",
  //                                       "poblacion":"Madrid",
  //                                       "provincia":"MADRID",
  //                                       "pais":"España"},
  //                                       "listaContactos":[
  //                                                           {
  //                                                             "idContacto":1,
  //                                                             "nombre":"trabajo",
  //                                                             "telefono1":"666666666",
  //                                                             "telefono2":"888888888",
  //                                                             "email":"i@v.c"
  //                                                           },
  //                                                           {
  //                                                             "idContacto":2,
  //                                                             "nombre":"casa",
  //                                                             "telefono1":"666666666",
  //                                                             "telefono2":"888888888",
  //                                                             "email":"i@v.c"
  //                                                           }
  //                                                         ]
  //                                       }
  //                         ];
  clients! : Client[];
  //Cliente buscado por id;
  client! : Client;


  //Tipo de tabla que hay que mostrar
  @Input()
  selectetTableType : string = "";

  displayedColumns : string[] = ["Id", "Razon Social", "Ciudad", "Telefono"];


  constructor(private clienteService : ClientService) { }

  ngOnInit(): void {
    this.chargeObjects();
  }

  chargeObjects(){
    switch(this.selectetTableType){
      case 'client':
                    this.clienteService.getClients().subscribe(data => {
                            this.clients = data;
                    });

                    break;
    }
  }

}
