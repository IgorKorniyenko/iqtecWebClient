import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/menuItem';
import { OPTIONS } from '../../shared/menuItemsValues/administrationSubmenu/administrationSubmenus';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-administracion-submenu',
  templateUrl: './administracion-submenu.component.html',
  styleUrls: ['./administracion-submenu.component.css']
})
export class AdministracionSubmenuComponent implements OnInit {

  //Banderines que hacen que se muestre o no la tabla o el submenu
  menuShowed : boolean = true;
  tableShowed : boolean = false;

  selected! : string;

  //Tipo de submenu elegido
  selectedType! : string;

  //Iconos y titulos de las subopciones mostradas
  options : MenuItem[] = OPTIONS;

  constructor() { }

  ngOnInit(): void {
    
  }

  showForm(title : string, type : string){
    this.menuShowed = !this.menuShowed;
    this.tableShowed = !this.tableShowed;
    this.selected = title;
    this.selectedType = type;
  }

  showTable(type : string){
    this.selectedType = type;
    this.menuShowed = false;
    this.tableShowed = true;
  }

  
  toSubmenu(){
    this.menuShowed = true;
    this.tableShowed = false;
    this.selectedType = "";
  }

}
