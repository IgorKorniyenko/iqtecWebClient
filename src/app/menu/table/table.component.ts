import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/shared/models/client';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { ClientService } from 'src/app/services/client.service';
import { HeadquaterService } from 'src/app/services/headquater.service';
import { ClientDialogComponent } from '../crud-components/dialogs/client-dialog/client-dialog.component';
import { Headquater } from 'src/app/shared/models/heaquater';
import { HeadquaterDialogComponent } from '../crud-components/dialogs/headquater-dialog/headquater-dialog.component';
import { Transport } from 'src/app/shared/models/transport';
import { TransportService } from 'src/app/services/transport.service';
import { TransportDialogComponent } from '../crud-components/dialogs/transport-dialog/transport-dialog.component';
import { Project } from 'src/app/shared/models/project';
import { Request } from 'src/app/shared/models/request';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectDialogComponent } from '../crud-components/dialogs/project-dialog/project-dialog.component';
import { User } from 'src/app/shared/models/user';
import { UserDialogComponent } from '../crud-components/dialogs/user-dialog/user-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { RequestService } from 'src/app/services/request.service';
import { RequestDialogComponent } from '../crud-components/dialogs/request-dialog/request-dialog.component';

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
  users!: User[];
  clients!: Client[];
  headquaters!: Headquater[];
  transports!: Transport[];
  projects!: Project[];
  requests!: Request[];

  starterUser: User = new User();
  starterClient : Client = new Client();
  starterHeadquater : Headquater = new Headquater();
  starterTransport: Transport = new Transport();
  starterProject: Project = new Project();
  starterRequest: Request = new Request();

  //Tipo de tabla que hay que mostrar
  @Input()
  selectedTableType!: string;
  singularTableType!: string;

  displayedColumns!: string[];

  dataSource!: MatTableDataSource<any>;

  constructor(private clienteService: ClientService, 
    private headquaterService: HeadquaterService,
    private transportService: TransportService, 
    private projectService: ProjectService,
    private userService: UserService,
    private requestService: RequestService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedTypeToSingular();
    this.chargeObjects();
  }

  chargeObjects() {
    switch (this.selectedTableType) {
      case 'Clientes':
        this.displayedColumns = ["Id", "Razon Social", "Ciudad", "Telefono", "Accion"];

        this.clienteService.getClients().subscribe(data => {
          this.clients = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;

      case 'Sedes':
        this.displayedColumns = ["Id", "Razon Social", "Ciudad", "Telefono", "Accion"];

        this.headquaterService.getHeadquaters().subscribe(data => {
          this.headquaters = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;

      case 'Transportes':
        this.displayedColumns = ["Id", "Razon Social", "Ciudad", "Telefono", "Accion"];

        this.transportService.getTransports().subscribe(data => {
          this.transports = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;

      case 'Proyectos':
        this.displayedColumns = ["Id", "Razon Social", "NombreCliente", "Accion"];

        this.projectService.getProjects().subscribe(data => {
          this.projects = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;


        case 'Solicitudes':
        this.displayedColumns = ["Id", "Referencia", "FechaRecogida", "IdProyecto", "Transporte", "Accion"];

        this.requestService.getRequests().subscribe(data => {
          this.requests = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;

        case 'Usuarios':
        this.displayedColumns = ["Id", "UserName", "Rol", "Accion"];

        this.userService.getUsers().subscribe(data => {
          this.users = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteData(name: string, type: string) {
    switch(type){
      case 'client':
        this.clienteService.deleteClient(name).subscribe();
        break;
      
      case 'headquater':
        this.headquaterService.deleteHeadquater(name).subscribe();
        break;
      
      case 'transport':
        this.transportService.deleteTransport(name).subscribe();
        break;

      case 'project':
        this.projectService.deleteProject(name).subscribe();
        break;

      case 'request':
        this.requestService.deleteRequest(name).subscribe();
        break;

      case 'user':
        this.userService.deleteUser(name).subscribe();
        break;
    }
   
  }

  selectedTypeToSingular() {

    switch (this.selectedTableType) {
      case "Clientes":
        this.singularTableType = "cliente";
        break;
      case "Sedes":
        this.singularTableType = "sede";
        break;
      case "Proyectos":
        this.singularTableType = "proyecto";
        break;
      case "Transportes":
        this.singularTableType = "transporte";
        break;
      case "Solicitudes":
        this.singularTableType = "solicitud";
        break;
      case "Usuarios":
        this.singularTableType = "usuario";
        break;
    }
  }



  // Metodo que abre el componente dialog con las medidas definidas y pasando como parametro el tipo de dialog que necesitamos
  openClientDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(ClientDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openHeadquaterDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(HeadquaterDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTransportDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(TransportDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProjectDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(ProjectDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openRequestDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(RequestDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




  openUserDialog(operationType: string, object: any) {

    const dialogRef = this.dialog.open(UserDialogComponent,{
      
      data: {
        operation: operationType,
        object: object
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
