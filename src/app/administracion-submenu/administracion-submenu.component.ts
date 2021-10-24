import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menuItems/menuItem';
import { OPTIONS } from '../shared/submenusValues/administrationSubmenus';

@Component({
  selector: 'app-administracion-submenu',
  templateUrl: './administracion-submenu.component.html',
  styleUrls: ['./administracion-submenu.component.css']
})
export class AdministracionSubmenuComponent implements OnInit {

  showed : boolean = true;
  selected! : string;
  type! : string;
  options : MenuItem[][] = OPTIONS;

  constructor() { }

  ngOnInit(): void {
  }

  showForm(title : string, type : string){
    this.showed = !this.showed;
    this.selected = title;
    this.type = type;
  }

}
