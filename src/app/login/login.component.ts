import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authenctication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



username : string ="";
password : string ="";
show: boolean= false;
loginmsg:boolean=false;
logoutmsg:boolean=false;
constructor(private router: Router,private login:AuthenticationService) { }
submit(){
  if (this.username === 'leema' && this.password === 'leema@1996') {
        this.router.navigate(['/noteview']);
        this.login.login();
        this.loginmsg=true;
        alert("login Successful")
      } else {
        alert('Invalid username or password');
        this.clear();
      }
}
logout(){
  this.login.logout();
  this.clear()
  this.logoutmsg=true;
}

clear(){
this.username ="";
this.password = "";
this.show = true;
}
}
