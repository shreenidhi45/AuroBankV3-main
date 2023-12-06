import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';

@Component({
  selector: 'app-customer-balance',
  templateUrl: './customer-balance.component.html',
  styleUrls: ['./customer-balance.component.css']
})
export class CustomerBalanceComponent {
  accountNumber:any 


  accountStorage:any
fetch: any;
  constructor(private auth:TransactionServiceService,
    private datas:DataServiceService,
    private fetchAccount:AccountServiceService)
  {
        this.accountNumber=datas.accountId
        if(datas.customerId !=null)
        {
          fetchAccount.AccountIdGetByCustomerId(datas.customerId).subscribe(
          {
            next:(res)=>
            {
              //here returing list
              this.accountStorage=res
              datas.accountId=this.accountStorage.accountNumber
            },
            error:(err:HttpErrorResponse)=>
            {
              console.log(err);
              console.log("account id not created");
            }
          }
            )
        }
  }
  
  balanceForm= new FormGroup(
    {
      accountId: new FormControl('', Validators.required)
    }
  )

  get tAccountNumberValidator()
  {
    return this.balanceForm.get('accountId')
  }

showfetchError=false
  onSubmit(id:any)
  {
    console.log(id,"id");
    
    this.fetchAccount.FetchAccount(id.accountId).subscribe(
      {
        next:(data)=>
        {
          this.fetch=data
          console.log(this.fetch);
          
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);
          this.showfetchError=true
          
        }
      }
    )
  }

  refreshfun()
  {
    location.reload()
  }
}
