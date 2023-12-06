import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-customer-fd-passbook',
  templateUrl: './customer-fd-passbook.component.html',
  styleUrls: ['./customer-fd-passbook.component.css']
})
export class CustomerFdPassbookComponent {
  accountStorage: any;

  //accountId:any
  constructor(private auth: AccountServiceService, private datas: DataServiceService) {

    if (datas.customerId != null) {


      auth.AccountIdGetByCustomerId(datas.customerId).subscribe(
        {
          next: (res) => {
            //here returing list
            this.accountStorage = res
            datas.accountId = this.accountStorage.accountNumber
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            console.log("account id not created");
          }
        }
      )
    }

  }


  FilterData: any
  resultcondition = false
  resultArray = false
  createAccount = false

  refreshFun() {
    location.reload()
  }

  accounts: any

  accountForm = new FormGroup({
    accountType: new FormControl('', Validators.required),

  });

  get accountTypeValidator() {
    return this.accountForm.get('accountType')
  }



  value: any
  onSubmit(data: any) {

    console.log(data.accountType);
    this.value = data.accountType

    this.auth.FetchFDAccountFromAccountID(this.value).subscribe({
      next: (res) => {
        this.resultcondition = true
        this.accounts = res;
        console.log("worked");
        console.log(this.accounts);
        

      },
      error: (err: HttpErrorResponse) => {
        console.log('Error in fetching account data', err);
      },
    });
  }

}
