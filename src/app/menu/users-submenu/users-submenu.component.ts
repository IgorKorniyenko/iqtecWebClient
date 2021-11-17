import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/menuItem';

@Component({
  selector: 'app-users-submenu',
  templateUrl: './users-submenu.component.html',
  styleUrls: ['./users-submenu.component.css']
})
export class UsersSubmenuComponent implements OnInit {

  // showed : boolean = true;
  // selected! : string;
  // options : MenuItem[] = [
  //                         {
  //                           title : "Crear cliente",
  //                           image : " /assets/images/subMenus/clients/Add_Male_User_Icon_128.png"
  //                         },
  //                         {
  //                           title : "Editar cliente",
  //                           image : " /assets/images/subMenus/clients/Edit_female_user_Icon_128.png"
  //                         },
  //                         {
  //                           title : "Borrar cliente",
  //                           image : " /assets/images/subMenus/clients/Remove_Male_User_Icon_128.png"
  //                         },
  //                         {
  //                           title : "Sedes",
  //                           image : ""
  //                         },
  //                         {
  //                           title : "Proyectos",
  //                           image : ""
  //                         }];

  constructor() { }

  ngOnInit(): void {
  }

  // showForm(title : string){
  //   this.showed = !this.showed;
  //   this.selected = title;
  // }

}
