import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from 'src/app/service/data-service.service';
import { QueryServiceService } from 'src/app/service/query-service.service';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  faCoffee = faCoffee;

  condition = true;
  sharedComponent: any

  totalCustomers = 450;
  totalAccounts = 574;
  totalQueries = 342;
  totalRequests = 243;

  userName: string = 'Admin'


  constructor(private dateFilter: TransactionServiceService,
    private routeSet: Router,
    private QueryRequest: QueryServiceService,
    private datas: DataServiceService) {


  }


  reset() {
    this.noQueryAdded = false
    location.reload()
  }

  result: any[] = [];
  resultcondition = false;
  dateData: any;
  resultArray = false;

  searchData() {
    this.dateFilter.getTransactionByDate(this.dateData).subscribe(
      {
        next: (data: any) => {
          if (data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
            this.resultcondition = false;
            this.resultArray = true;

          } else if (Array.isArray(data)) {
            this.result = data;
            console.log(data);
            this.resultcondition = true;
          } else {
            console.error("Unexpected data format:", data);
          }
        },
        error: (er: HttpErrorResponse) => {
          console.log(er);
        }
      }
    );
  }


  //card show query request by click
  showQueryResult = false;
  customerQueries: any;
  noQueryAdded = false;
  handleCardClick() {
    this.QueryRequest.getRequestQuery().subscribe(
      {
        next: (data:any) => {

          this.customerQueries = data;
          console.log(data);
          this.showQueryResult = true;
          this.showUpdateInterest = false
          this.showAccountRequest = false;
          this.showAccountTransactions = false
          this.showTransactionState = false
          this.showCardsState = false;
          this.showCustomerAll=false;
          this.noQueryAdded = false;
          
          
          
        },
        error: (err: HttpErrorResponse) => {
          this.noQueryAdded = true;
          this.showUpdateInterest = false
          this.showAccountRequest = false;
          this.showAccountTransactions = false
          this.showTransactionState = false
          this.showCardsState = false;
          this.showCustomerAll=false;
          console.log(err);
          console.log("error worked");

        }
      }
    )
  }




  feedbackMessage: any;
  //reply form

  replyForm = new FormGroup({
    replyQuery: new FormControl('', Validators.required),
    customerId: new FormControl('', Validators.required),

  });
  get replyValidator() {
    return this.replyForm.get('replyQuery')
  }
  get cutomerIdValidator() {
    return this.replyForm.get('customerId')
  }
  eroorQuerySubmit = false
  onSubmit(formData: any) {

    // Assuming you have a method in your service to handle the data submission
    this.QueryRequest.putReplyQuery(formData).subscribe(
      {
        next: (data:any) => {

          this.feedbackMessage = data;
          alert("succesfully Replied")
          location.reload()


        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          console.log("error here");
          this.eroorQuerySubmit = true


        }
      }
    );
  }


  formShow = false;
  generateReplyForm() {
    this.formShow = true;

    this.showTransactionState = false
    this.showCustomerAll = false
    this.showAccountTransactions = false
    this.showAccountRequest = false;
    this.showUpdateInterest = false
    this.showTransactionState = false
    this.showCardsState = false;
    this.noQueryAdded=false;

  }

  //accounrequest
  showAccountRequest = false
  handleAccountRequest() {
    this.showAccountRequest = true;
    this.showCustomerAll = false
    this.showAccountTransactions = false
    this.formShow = false;
    this.showUpdateInterest = false
    this.showQueryResult = false;
    this.showTransactionState = false
    this.showCardsState = false;
    this.noQueryAdded=false;
    this.showFDAccountRequests = false
  }

  //
  showAccountTransactions = false
  AccountTransactionFilter() {
    this.showAccountTransactions = true;
    this.showCustomerAll = false
    this.showAccountRequest = false;
    this.showUpdateInterest = false
    this.formShow = false;
    this.showQueryResult = false;
    this.showTransactionState = false
    this.showCardsState = false;
  }

  //showCustomerAll

  showCustomerAll = false
  showCustomerFun() {
    this.showCustomerAll = true
    this.showAccountRequest = false;
    this.showUpdateInterest = false
    this.showAccountTransactions = false
    this.formShow = false;
    this.showQueryResult = false;
    this.showTransactionState = false;
    this.showCardsState = false;
    this.noQueryAdded=false;
    
  }
  //update interest
  showUpdateInterest = false

  UpdateInterest() {
    this.showUpdateInterest = true

    this.showAccountRequest = false;
    this.showAccountTransactions = false
    this.formShow = false;
    this.showQueryResult = false;
    this.showTransactionState = false
    this.showCardsState = false;
    this.noQueryAdded=false;
  }


  showTransactionState = false
  showTransaction() {
    this.showTransactionState = true
    this.showUpdateInterest = false
    this.showAccountRequest = false;
    this.showAccountTransactions = false
    this.formShow = false;
    this.showQueryResult = false;
    this.showCustomerAll = false;
    this.showCardsState = false;
    this.noQueryAdded=false;
    

  }

  logout() {
    // Call the logout method to clear user-related data
    this.datas.logout();
    this.routeSet.navigateByUrl("")
    // Additional logout logic (e.g., redirect to login page) can be added here
  }

  showCardsState = true;
  showCards() {
    this.showCardsState = true;
    this.showTransactionState = false
    this.showUpdateInterest = false
    this.showAccountRequest = false;
    this.showAccountTransactions = false
    this.formShow = false;
    this.showQueryResult = false;
    this.showCustomerAll = false;
  }


  //crud customer
showCrudeState=false
showCrud()
  {
this.showCrudeState=true

    this.showTransactionState=false
    this.showUpdateInterest=false
    this.showAccountRequest=false;
    this.showAccountTransactions=false 
    this.formShow=false;
    this.showQueryResult=false;
    this. showCustomerAll=false;
  }
  adminRegister=false
  registerNewAdmin()
  {
    this.adminRegister=true



    this.showCrudeState=false
    this.showTransactionState=false
    this.showUpdateInterest=false
    this.showAccountRequest=false;
    this.showAccountTransactions=false 
    this.formShow=false;
    this.showQueryResult=false;
    this. showCustomerAll=false;
  }
  showInterest=false
  showAcccountInterest(){
  this.showInterest=true
  }
  showFDAccountRequests = false
  fdAccountRequestAccept()
  {
    this.showFDAccountRequests = true
    this.showAccountRequest = false;
    this.showCustomerAll = false
    this.showAccountTransactions = false
    this.formShow = false;
    this.showUpdateInterest = false
    this.showQueryResult = false;
    this.showTransactionState = false
    this.showCardsState = false;
    this.noQueryAdded=false;
    this.showCrudeState=false;
    this.adminRegister=false;
    
  }

}