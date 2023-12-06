import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryServiceService } from 'src/app/service/query-service.service';

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent {

  constructor(private auth:QueryServiceService){}
  queries:any
  queryNotFound=false


  customerIdForm = new FormGroup({
    customerId: new FormControl('', [Validators.required])
  });

  get qValidator()
  {
    return this.customerIdForm.get('customerId')
  }

tableShow=false
  showQuery(data:any)
  {
    this.auth.getCustomerQuery(data.customerId).subscribe(
      {
        next:(data)=>
        {
          console.log(data);
          
          this.tableShow=true
         this.queries=data
       
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);
         this.queryNotFound=true
          
        }
      }
    )
  }


  refreshfun()
  {
    location.reload();
  }
}
