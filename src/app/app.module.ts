import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

//Formularios reactivos de Angular
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing/app-routing.module';

//Importamos el modulo http
import { HttpClientModule } from '@angular/common/http';

import { BASEURL } from './shared/api/endpoints'

//Servicios
import { ClientService } from './services/client.service';
import { HeadquaterService } from './services/headquater.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersSubmenuComponent } from './menu/users-submenu/users-submenu.component';
import { CreateComponent } from './menu/crud-components/create/create.component';
import { AdministracionSubmenuComponent } from './menu/administracion-submenu/administracion-submenu.component';
import { ConsultasSubmenuComponent } from './menu/consultas-submenu/consultas-submenu.component';
import { SeguimientoSubmenuComponent } from './menu/seguimiento-submenu/seguimiento-submenu.component';
import { EditComponent } from './menu/crud-components/edit/edit.component';
import { DeleteComponent } from './menu/crud-components/delete/delete.component';
import { TableComponent } from './menu/table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowComponent } from './menu/crud-components/show/show.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './menu/crud-components/dialogs/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientDialogComponent } from './menu/crud-components/dialogs/client-dialog/client-dialog.component';
import { HeadquaterDialogComponent } from './menu/crud-components/dialogs/headquater-dialog/headquater-dialog.component';
import { TransportDialogComponent } from './menu/crud-components/dialogs/transport-dialog/transport-dialog.component';
import { ProjectDialogComponent } from './menu/crud-components/dialogs//project-dialog/project-dialog.component';
import { RequestDialogComponent } from './menu/crud-components/dialogs/request-dialog/request-dialog.component';
import { UserDialogComponent } from './menu/crud-components/dialogs/user-dialog/user-dialog.component';
import { TransportService } from './services/transport.service';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { ProjectService } from './services/project.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginPageComponent,
    UsersSubmenuComponent,
    CreateComponent,
    AdministracionSubmenuComponent,
    ConsultasSubmenuComponent,
    SeguimientoSubmenuComponent,
    EditComponent,
    DeleteComponent,
    TableComponent,
    NavbarComponent,
    ShowComponent,
    DialogComponent,
    ClientDialogComponent,
    HeadquaterDialogComponent,
    TransportDialogComponent,
    ProjectDialogComponent,
    RequestDialogComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTableModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [
    ClientService,
    TransportService,
    UserService,
    RequestService,
    ProjectService,
    HeadquaterService,
    { provide: 'BaseURL', useValue: BASEURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
