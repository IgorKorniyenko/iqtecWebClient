import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menuItems/menuItem';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  options: MenuItem[] = [
                      {
                        title : "Administracion",
                        image : "/assets/images/application.png"
                      },
                      {
                        title : "Seguimiento",
                        image : "/assets/images/seguimiento.png"
                      },
                      {
                        title : "Consultas",
                        image : "/assets/images/consultas.png"
                      },
                      {
                        title : "Usuarios",
                        image : "/assets/images/clients.jpg"
                      }
                    ];

  showed : boolean = true;
  selectedMenu : string = "null";

  constructor() { }

  ngOnInit(): void {
  }

  showSubMenu(title : string){
    
    this.showed = !this.showed;
    this.selectedMenu = title;
  }

}
