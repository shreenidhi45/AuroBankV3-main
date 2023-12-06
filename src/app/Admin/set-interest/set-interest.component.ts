import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';

@Component({
  selector: 'app-set-interest',
  templateUrl: './set-interest.component.html',
  styleUrls: ['./set-interest.component.css']
})
export class SetInterestComponent {

  myForm: FormGroup = new FormGroup({
    AccountType: new FormControl('', Validators.required),
    InterestRate: new FormControl('', Validators.required),
  });



  get AccountTypeValidator()
  {
   return this.myForm.get('AccountType')
  }
  get InterestRateValidator()
  {
   return this.myForm.get('InterestRate')
  }

constructor(private auth:AccountServiceService){}
  onSubmit(data:any)
  {
this.auth.setAccountInterest(data).subscribe(
  {
    next:(data)=>
    {
      console.log(data);
      alert("successfully updated the Interest")
      location.reload()
      
    },
    error:(err:HttpErrorResponse)=>
    {
      console.log(err);
      console.log("No Account type matched");
      
      
      
    }
  }
)
  }
}
