import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';

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


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  
  logOut(){
    this.logOutEmitter.emit(false);

    this.userService.removeToken();

  }
}
