import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { AdministracionSubmenuComponent } from '../menu/administracion-submenu/administracion-submenu.component';
import { SeguimientoSubmenuComponent } from '../menu/seguimiento-submenu/seguimiento-submenu.component';
import { UsersSubmenuComponent } from '../menu/users-submenu/users-submenu.component';
import { TableComponent } from '../menu/table/table.component';
import { LoginPageComponent } from '../login-page/login-page.component';

export const routes: Routes = [
  { path: 'home',  component: MenuComponent },
  { path: 'administration',     component: AdministracionSubmenuComponent },
  { path: 'track',     component: SeguimientoSubmenuComponent },
  { path: 'user',     component: UsersSubmenuComponent },
  { path: 'administration/:type', component : TableComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login',  component: LoginPageComponent },
];