import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/models/menuItem';
import { MAINMENUVALUES } from '../shared/menuItemsValues/mainMenuValues';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  options: MenuItem[] = MAINMENUVALUES;

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
