import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.css']
})
export class RequestAccountComponent {

 @Input () data:any;
 localValue: any;
 
  accountForm = new FormGroup({
    accountType: new FormControl('', Validators.required),
    accountBalance: new FormControl('',[Validators.required,Validators.min(0)]),
    customerId: new FormControl(''),
  });

  get accountTypeValidator()
{
  return this.accountForm.get('accountType')
}

get accountBalanceValidator()
{
  return this.accountForm.get('accountBalance')
}


cutomerId:any
constructor(private auth:AccountServiceService,datas:DataServiceService){
  
 
this.cutomerId=datas.customerId

}



onSubmit(data:any)
{
this.auth.RequestAccount(data).subscribe(
  {
    next:(data)=>
    {
      console.log(data);
      alert("Request send to Admin ")
      location.reload();
      
    },
    error:(err:HttpErrorResponse)=>
    {
      console.log(err);

    }
  }
)
}


}
