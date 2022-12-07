import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  errorMesOn = false;
  thePath = "";

  checkPassToMail(email:string, pass:string) : boolean{ //check if password and email matching
    let p = localStorage.getItem(email);
    if(p === null){
      return false;
    }
    if(p != pass){
      return false;
    }
    return true;
  }

  // onChange(f : any){     //save for maybe change in the future
  //   if(f.value.email){
  //     if(this.checkPassToMail(f.value.email, f.value.password)){
  //       this.thePath = "products";
  //       console.log("onChange works"); ///////////////delete//////////
  //     }
  //   }
  //   else{
  //     this.thePath = "";
  //     console.log("onChange works"); ///////////////delete//////////
  //   }
  // }

  onClick(f : any){ 
    if(!this.checkPassToMail(f.value.email, f.value.password) && f.value.email && f.value.password){
      this.errorMesOn = true;
    }
    else if(this.checkPassToMail(f.value.email, f.value.password)){
      this.errorMesOn = false;
      this.thePath = "products";
     }
  }
  
}