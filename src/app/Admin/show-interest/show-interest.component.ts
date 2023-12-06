import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountServiceService } from 'src/app/service/account-service.service';

@Component({
  selector: 'app-show-interest',
  templateUrl: './show-interest.component.html',
  styleUrls: ['./show-interest.component.css']
})
export class ShowInterestComponent {
  showCardsState:any

  insterstRate:any
  savingsRate: number | undefined; // Assuming interest rates are numeric, adjust the type as needed
  currentRate: number | undefined; 
  constructor(private auth:AccountServiceService)
  {
    auth.showActiveAccounts().subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.insterstRate=res

 this.insterstRate.forEach((rate: { accountType: string; intrestRate: number | undefined; }) => {
  if (rate.accountType === "Savings") {
    this.savingsRate = rate.intrestRate;
  } else if (rate.accountType === "Current") {
    this.currentRate = rate.intrestRate;
  }

  // If you only need one value for each account type, you can break out of the loop once found
  if (this.savingsRate !== undefined && this.currentRate !== undefined) {
    return;
  }
});

// Use the stored values as needed
console.log("Savings Rate:", this.savingsRate);
console.log("Current Rate:", this.currentRate);
        },
        error:(err:HttpErrorResponse)=>
        {

        }
      }
    )
  }

}

