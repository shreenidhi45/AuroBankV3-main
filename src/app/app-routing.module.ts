import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { WeatherComponent } from './weather/weather.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { CutomerDashboardComponent } from './Customer/cutomer-dashboard/cutomer-dashboard.component';
import { CustomerRegisterComponent } from './Customer/customer-register/customer-register.component';
import { CustomerDocumentComponent } from './Customer/customer-document/customer-document.component';
import { CustomertTransactionComponent } from './Customer/customert-transaction/customert-transaction.component';
import { AuthGuard } from './auth.guard';
 
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registerForm', component: SignupPageComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'customer', component: CutomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
  { path: 'customerRegister', component: CustomerRegisterComponent },
  { path: 'customerDocument', component: CustomerDocumentComponent },
  { path: 'customerTransaction', component: CustomertTransactionComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
