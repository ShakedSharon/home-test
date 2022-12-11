import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onChange(f : NgForm): void{
    if(f.value.email === null || f.value.password === null){
      this.thePath = "";
    }
    if(!this.checkPassToMail(f.value.email, f.value.password)){
      this.thePath = "";
    }
    if(this.checkPassToMail(f.value.email, f.value.password)){
      this.thePath = "products";
    }
  }

  onClick(f : NgForm){ 
    if(!this.checkPassToMail(f.value.email, f.value.password) && f.value.email && f.value.password){
      this.errorMesOn = true;
    }
    else if(this.checkPassToMail(f.value.email, f.value.password)){
      this.errorMesOn = false;
     }
  }
  
}