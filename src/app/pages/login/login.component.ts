import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginData={
    "username":'',
    "password":''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router){}
  ngOnInit(): void {
      
  }

  formSubmit(){
    if(this.loginData.username.trim()==''||this.loginData.username.trim()==''){
      this.snack.open("el nombre de usuario es requerido!!",'Aceptar',{
        duration:3000
      })
      return;
    }


    if(this.loginData.password.trim()==''||this.loginData.password.trim()==''){
      this.snack.open("la contraseña es requerida!!",'Aceptar',{
        duration:3000
      })
      return;
    }

  
  this.loginService.generateToken(this.loginData).subscribe(
    (data:any)=>{
      console.log(data);
      //puso ultimo
      this.loginService.loginUser(data.token);
      this.loginService.getCurrentUser().subscribe((user:any)=>{
        //nuevo final
        this.loginService.setUser(user);
        console.log(user);

        if(this.loginService.getUserRole()=="ADMIN"){
          //dasnoarh admin
          //window.location.href='/admin';
          this.router.navigate(['admin']);
          this.loginService.loginStatusSubject.next(true);


        }else if(this.loginService.getUserRole()=='NORMAL'){
          //USER DASHBOAR
          //window.location.href='/user-dashboard';
          this.router.navigate(['user-dashboard']);
          this.loginService.loginStatusSubject.next(true);

        }else{
          this.loginService.logout();
        }


      })
    },(error)=>{
      console.log(error);
      this.snack.open('Detalles invalidos, vuelva a intentar!!','aceptar',{
        duration:3000
      });
    }
  );
  }


}
