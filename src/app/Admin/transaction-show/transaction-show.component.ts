import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';

@Component({
  selector: 'app-transaction-show',
  templateUrl: './transaction-show.component.html',
  styleUrls: ['./transaction-show.component.css']
})
export class TransactionShowComponent {
  transactions:any;
  accountNumberGet:any;
  constructor(private auth:TransactionServiceService,private AccountFilter:AccountServiceService){
  
  this.auth.showAllTransaction().subscribe(
    { 
      next:(data)=> 
      {
        this.transactions=data
      },
      error:(err:HttpErrorResponse)=>
      {
          console.log(err);
          
      }
    }
  )

  auth.showActiveAccountNumber().subscribe(
    {
      next:(res)=>
      {
       this.accountNumberGet=res
      },
      error:(err:HttpErrorResponse)=>
      {
        console.log(err);
        
      }
    }
  )



    
  }



  accountForm = new FormGroup({
    accountNumber: new FormControl('', Validators.required),
    
  });
  
  get accountTypeValidator()
  {
  return this.accountForm.get('accountNumber')
  }


resultcondition=false
resultArray=false
accounts:any
  value:any
onSubmit(data: any) {

 
console.log(data,"accountNumber");

  this.AccountFilter.AccountFilter(data.accountNumber).subscribe({
    next: (res) => {
    this.resultcondition=true
      this.accounts = res;
     
      
    },
    error: (err: HttpErrorResponse) => {
      console.log('Error in fetching account data', err);
    },
  });
}
}
