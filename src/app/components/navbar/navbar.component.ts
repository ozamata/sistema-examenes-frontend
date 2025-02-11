import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  //crear una instancion o inyeccion
constructor(public login:LoginService){}


  ngOnInit(): void {
      
  }
//CERRAR SESION
  public logout(){
    this.login.logout();
    window.location.reload(); 
  }
}
