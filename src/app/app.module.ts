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

//Importamos el modulo http
import { HttpClientModule } from '@angular/common/http';

import { BASEURL } from './shared/api/endpoints'

//Servicios
import { ClientService } from './services/client.service';

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
    DeleteComponent
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
    MatInputModule
  ],
  providers: [
    ClientService,
    { provide: 'BaseURL', useValue: BASEURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
