import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { Tracking } from 'src/app/shared/models/tracking';
import { TrackingService } from 'src/app/services/tracking.service';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/shared/models/state';
import { DeleteDialogComponent } from '../crud-components/delete-dialog/delete-dialog.component';

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
  tracks!: Tracking[];

  userRol!: string;

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
    private trackService: TrackingService,
    private stateService: StateService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedTypeToSingular();
    this.chargeObjects();

    this.userRol = localStorage.getItem("role") as string;
    console.log(this.userRol)
  }

  chargeObjects() {
    switch (this.selectedTableType) {
      case 'Clientes':
        this.displayedColumns = ["Id", "RazonSocial", "Ciudad", "Telefono", "Accion"];

        this.clienteService.getClients().subscribe(data => {
          // this.clients = data;
          // this.dataSource = new MatTableDataSource(data);

          this.clients = data;
          this.dataSource = new MatTableDataSource(this.clients.filter( a => a.activo));
        });

        break;

      case 'Sedes':
        this.displayedColumns = ["Id", "RazonSocial", "Ciudad", "Telefono", "Accion"];

        this.headquaterService.getHeadquaters().subscribe(data => {
          // this.headquaters = data;
          // this.dataSource = new MatTableDataSource(data);

          this.headquaters = data;
          this.dataSource = new MatTableDataSource(this.headquaters.filter(a => a.activo));
        });

        break;

      case 'Transportes':
        this.displayedColumns = ["Id", "RazonSocial", "Ciudad", "Telefono", "Accion"];

        this.transportService.getTransports().subscribe(data => {
          // this.transports = data;
          // this.dataSource = new MatTableDataSource(data);

          this.transports = data;
          this.dataSource = new MatTableDataSource(this.transports.filter(a => a.activo));
        });

        break;

      case 'Proyectos':
        this.displayedColumns = ["Id", "RazonSocial", "NombreCliente", "Accion"];

        this.projectService.getProjects().subscribe(data => {
          // this.projects = data;
          // this.dataSource = new MatTableDataSource(data);

          this.projects = data;
          this.dataSource = new MatTableDataSource(this.projects.filter(a => a.activo));
        });

        break;


        case 'Solicitudes':
        this.displayedColumns = ["Id", "Referencia", "FechaRecogida", "IdProyecto", "Transporte", "Accion"];

        this.requestService.getRequests().subscribe(data => {
          this.requests = data;
          this.dataSource = new MatTableDataSource(data);

          // this.requests = data;
          // this.dataSource = new MatTableDataSource(this.requests.filter(a => a.activo));
        });

        break;

        case 'Usuarios':
        this.displayedColumns = ["Id", "UserName", "Rol", "Accion"];

        this.userService.getUsers().subscribe(data => {
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users.filter(a => a.activo));
        });

        break;

        case 'Seguimientos':
        this.displayedColumns = ["Id", "Fecha", "Estado", "Usuario", "Accion"];

        this.trackService.getTracks().subscribe(data => {
          this.tracks = data;
          this.dataSource = new MatTableDataSource(data);
        });

        break;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  


  deleteData(id: any, type: string) {

    let dialogMessage = "Dato borrado correctamente";

    switch(type){
      case 'client':

      console.log("cliente")
        let client = this.clients.find(client => client.idCliente == id) as Client;
        client.activo = false;

        console.log(client)

        this.clienteService.putCliente(client).subscribe();
        this.openDeleteDialog(dialogMessage);

       // this.clienteService.deleteClient(name).subscribe();
        
        break;
      
      case 'headquater':
        let headquater = this.headquaters.find(headquater => headquater.idSede == id) as Headquater;
        headquater.activo = false;

        this.headquaterService.putHeadquater(headquater).subscribe();
        this.openDeleteDialog(dialogMessage);

      //  this.headquaterService.deleteHeadquater(name).subscribe();
        break;
      
      case 'transport':
        let transport = this.transports.find(transport => transport.id == id) as Transport;
        transport.activo = false;

        this.transportService.putTransport(transport).subscribe();
        this.openDeleteDialog(dialogMessage);

        //this.transportService.deleteTransport(name).subscribe();
        break;

      case 'project':
        let project = this.projects.find(project => project.idProyecto == id) as Project;
        project.activo = false;

        this.projectService.putProject(project).subscribe();
        this.openDeleteDialog(dialogMessage);

       // this.projectService.deleteProject(name).subscribe();
        break;

      case 'request':
        // let request = this.requests.find(request => request.idSolicitud == id) as Request;
        // request.activo = false;

        // this.requestService.putRequest(request).subscribe();

        

        this.requestService.deleteRequest(id).toPromise()
        .then(data =>{
          this.openDeleteDialog(dialogMessage);
        })
        .catch(error => {
          dialogMessage = "No se puede borrar la solicitud";
          console.log(dialogMessage)
          this.openDeleteDialog(dialogMessage);
        })
        break;

      case 'user':
        // let user = this.users.find(user => user.nombreUsuario == id) as User;
        // user.activo = false;

        // this.userService.putUser(user).subscribe();
        this.openDeleteDialog(dialogMessage);

        this.userService.deleteUser(id).subscribe();
        break;
    }
    console.log(dialogMessage)
    
   
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
      this.chargeObjects();
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
      this.chargeObjects();
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
      this.chargeObjects();
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
      this.chargeObjects();
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
      this.chargeObjects();
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
      this.chargeObjects();
    });
  }


  openDeleteDialog(message: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent,{
     data: {
       message: message
     }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chargeObjects();
    });
  }


  changeState(track: Tracking){

    var stateList: State[];

    this.stateService.getAll().subscribe( data => {

      stateList = data;

      var statePosition = track.estado.idEstado;

      if(statePosition != 6){
        track.estado = stateList.find( state => state.idEstado == (statePosition + 1)) as State; 
      }

      this.trackService.putTrack(track).subscribe();
    })

    
  }

  
}

