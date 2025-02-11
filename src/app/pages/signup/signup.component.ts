import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public user={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:''
  }
  //injectar el userservice y snack (alertas)
  constructor(private userService:UserService,private snack:MatSnackBar){}
  ngOnInit(): void {
      
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username==''||this.user.username==null){
      this.snack.open('el nombre de usuarioo es requerido !!','Aceptar',
        {
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        }
      )
      return;
    }
    //metodo para añadir usuarios
    //va retornar un observable
    this.userService.añadirUsuario(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('usuario guardado','usuario guardado con exito','success');

      },(error)=>{
        console.log(error);
       
        this.snack.open('ha ocurrido un error en el sistema !!','Aceptar',
          {
            duration:3000,
            verticalPosition:'top',
            horizontalPosition:'right'
          })

      }
    )
  }


}
