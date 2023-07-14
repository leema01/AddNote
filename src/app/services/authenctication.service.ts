import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  logingStatus=false;

  login(){
    console.log("this will give true for login")
    return this.logingStatus=true;


  }
  logout(){
    return this.logingStatus=false;
  }
  getLoginStatus(){
    return this.logingStatus;
  }
}
