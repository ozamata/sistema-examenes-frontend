import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import baseUrl from './helper';
@Injectable({
  providedIn: 'root'

})
export class UserService {
//injectar
  constructor(private httpClient: HttpClient) { }
//pasar un usuario de tipo anny
//retornando una peticion post
  public añadirUsuario(user:any){
    return this.httpClient.post(`${baseUrl}/usuarios/`,user)
  }

}
