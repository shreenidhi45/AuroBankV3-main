import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-two-date-filter',
  templateUrl: './two-date-filter.component.html',
  styleUrls: ['./two-date-filter.component.css']
})
export class TwoDateFilterComponent {

  dateFilterForm = new FormGroup({ 
    date: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required]),
    accountNumber:new FormControl('',[Validators.required])
  });


  get startDateValidator()
  {
    return this.dateFilterForm.get('date')
  }
  
  get endDateValidator()
  {
    return this.dateFilterForm.get('endDate')
  }
  get accountNumberValidator()
  {
    return this.dateFilterForm.get('accountNumber')
  }


  dateNotFound=false;
  transactions: any;
  accountId=this.datas.accountId;
  accountStorage:any


  constructor(private auth:CustomerServiceService,private datas:DataServiceService,
    private fetchAccount:AccountServiceService)
  {
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
 
  onSubmit(data:any)
  {
    this.auth.twoDateFilter(data).subscribe(
      {
        next:(datas)=>
        {
          console.log(datas);
          this.transactions =datas;
        },
        error:(err:HttpErrorResponse)=> 
        {
          console.log(err);
          console.log("no date found");
         this.dateNotFound=true
          
          
        }
      }
    )
  }


  refreshFun()
  {
    location.reload()
  }

  downloading: boolean = false;

  downloadTable() {
    this.downloading = true;
  
    // Simulate an asynchronous operation (e.g., an HTTP request) to download the data
    setTimeout(() => {
      const csvData = this.convertToCSV(this.transactions);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'table_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  
      this.downloading = false;
    }, 1000); // Simulating a 1-second delay for the download
  }
  
  private convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return `${header}\n${rows.join('\n')}`;
  }
  
}