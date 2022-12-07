import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  validFile : boolean = false;
  
  public isUpper(str: string): boolean { //check if str contain a capital letter
    return /[A-Z]/.test(str);
  }

  re = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");

  public isValidEmail(val: any): boolean {  //checking validation of an email
    return this.re.test(val.value.email);
  }

  public isValidPassword(val: any): boolean {  
    if(val.value.password?.length < 6 || !this.isUpper(val.value.password)){
      return false;
    }
    return true;
  }

  public equalPasswords(val: any): boolean{ //check if the repeat password and the password equals
    if(val.value.password != val.value.passwordRepeat){
      return false;
    }
    return true;
  } 

  isValidFile(val: any): boolean{   //Checks if all inputs are valid
    if(this.isValidEmail(val) && this.isValidPassword(val) && this.equalPasswords(val)){
      this.validFile = true;
      return true;
    }
    this.validFile = false;
    return false;
  }

  onSubmit(f : any){
    localStorage.setItem(f.value.email, f.value.password);
  }

}