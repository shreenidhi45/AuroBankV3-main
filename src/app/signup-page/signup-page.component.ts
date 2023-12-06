import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from '../matchpassword.validator';
import { RegisterServiceService } from '../service/register-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  showErrorMessage:any;
  registerForm=new FormGroup(
    {
      UserName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      Password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      ConfirmPassword:new FormControl('',[Validators.required]),//no validation
      roleId:new FormControl('2',[Validators.required])
    },
    {
      validators:matchpassword 
    }

  )
  
  get userValidator()
  {
    return this.registerForm.get('UserName')
  }
  get emailValidator()
  {
    return this.registerForm.get('email')
  }
  get passwordValidator()
  {
    return this.registerForm.get('Password')
  }
  get confirmValidator()
  {
    return this.registerForm.get('ConfirmPassword')
  }
  get roleValidator()
  {
    return this.registerForm.get('roleId')
  }

  constructor(private auth:RegisterServiceService,private route:Router){}
  
  submitData(data:any)
  {
    this.auth.register(data).subscribe(
      {
        next: (data) => {
          console.log(data);
          alert("registration success");
          this.route.navigateByUrl("");
        },
        error: (errorRes: HttpErrorResponse) => {
          console.log(errorRes);
          this.showErrorMessage=true
        }
      }
    )
  }


  RefreshDighnUp()
  {
    location.reload()
  }

}