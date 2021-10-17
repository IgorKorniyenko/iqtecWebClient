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
                        title : "Clientes",
                        image : "/assets/images/clients.jpg"
                      },
                      {
                        title : "Solicitudes",
                        image : "/assets/images/application.png"
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
