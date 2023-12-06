import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { CutomerDashboardComponent } from './Customer/cutomer-dashboard/cutomer-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { FormsModule } from '@angular/forms';
import { CustomerRegisterComponent } from './Customer/customer-register/customer-register.component';
import { CustomerDocumentComponent } from './Customer/customer-document/customer-document.component';
import { CustomertTransactionComponent } from './Customer/customert-transaction/customert-transaction.component';
import { CustomerPassbookComponent } from './Customer/customer-passbook/customer-passbook.component';
import { CustomerQueryComponent } from './Customer/customer-query/customer-query.component';
import { AdminAccountRequestComponent } from './Admin/admin-account-request/admin-account-request.component';
import { RequestAccountComponent } from './Customer/request-account/request-account.component';
import { AccountFilterComponent } from './Admin/account-filter/account-filter.component';
import { AccountStatementComponent } from './Customer/account-statement/account-statement.component';
import { UpdateCustomerComponent } from './Admin/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './Admin/delete-customer/delete-customer.component';
import { ShowCustomerComponent } from './Admin/show-customer/show-customer.component';
import { PaginationComponent } from './Customer/pagination/pagination.component';
import { TwoDateFilterComponent } from './Customer/two-date-filter/two-date-filter.component';
import { SetInterestComponent } from './Admin/set-interest/set-interest.component';
import { ViewQueryComponent } from './Customer/view-query/view-query.component';
import { FdCalculatorComponent } from './Customer/fd-calculator/fd-calculator.component';
import { TransactionShowComponent } from './Admin/transaction-show/transaction-show.component';
import { AdminRegisterComponent } from './Admin/admin-register/admin-register.component';
import { ShowInterestComponent } from './Admin/show-interest/show-interest.component';
import { AdminFdaccountRequestComponent } from './Admin/admin-fdaccount-request/admin-fdaccount-request.component';
import { FixedDepositComponent } from './Customer/fixed-deposit/fixed-deposit.component';
import { CustomerFdPassbookComponent } from './Customer/customer-fd-passbook/customer-fd-passbook.component';
import { CustomerBalanceComponent } from './Customer/customer-balance/customer-balance.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupPageComponent,
    WeatherComponent,
    AdminDashboardComponent,
    CutomerDashboardComponent,
    CustomerRegisterComponent,
    CustomerDocumentComponent,
    CustomertTransactionComponent,
    CustomerPassbookComponent,
    CustomerQueryComponent,
    AdminAccountRequestComponent,
    RequestAccountComponent,
    AccountFilterComponent,
    AccountStatementComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    ShowCustomerComponent,
    PaginationComponent,
    TwoDateFilterComponent,
    SetInterestComponent,
    ViewQueryComponent,
    FdCalculatorComponent,
    TransactionShowComponent,
    AdminRegisterComponent,
    ShowInterestComponent,
    AdminFdaccountRequestComponent,
    FixedDepositComponent,
    CustomerFdPassbookComponent,
    CustomerBalanceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,ReactiveFormsModule,HttpClientModule, FontAwesomeModule,FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
