import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  user:string="";
  
  @Input()
  rol: string="";
  
  @Output() logOutEmitter = new EventEmitter<boolean>();

  logOut(){
    this.logOutEmitter.emit(false);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
