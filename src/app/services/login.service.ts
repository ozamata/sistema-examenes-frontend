import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public generateToken(logindata:any){
    return this.http.post(`${baseUrl}/generate-token`,logindata);
  }

  //iniciamos sesion y establecemos el token en el localstore
  public loginUser(token:any){
    localStorage.setItem('token',token)
  }

  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr == undefined||tokenStr==''||tokenStr==null){
      return false;
    }else{
      return true;
    }
  }


  //cerrar sesion y eliinamos el token de localstorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');

  }
  //establecer un usuario
  //convertir string a json
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;  
  }


  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

}
