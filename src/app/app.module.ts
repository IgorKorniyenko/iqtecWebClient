import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ClientSubmenuComponent } from './client-submenu/client-submenu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginPageComponent,
    ClientSubmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
