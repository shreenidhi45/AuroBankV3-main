import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { DataServiceService } from '../service/data-service.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  loginUserForm = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  });
 
  get userValidator() {
    return this.loginUserForm.get('UserName');
  }
 
  get passwordValidator() {
    return this.loginUserForm.get('Password');
  }
 
  token: any = '';
  headers: any;
  user: any;
  showErrorMessage: any;
 
  constructor(private auth: UserServiceService, private route: Router, private datas: DataServiceService) { }
 
  submitData(data: any) {
    this.auth.login(data).subscribe({
      next: (response) => {
        this.headers = response.headers.get('jwt');
        this.headers = JSON.parse(this.headers);
        this.user = response.body;
 
        console.log('Received User Data:', this.user);
 
        localStorage.setItem('token', this.headers);
 
        // Store data service values
        this.datas.userId = this.user.userId;
        this.datas.userName = this.user.userName;
        this.datas.role = this.user.roleName;
 
        console.log('userId', this.datas.userId);
        console.log('userName', this.datas.userName);
        console.log('roleName', this.datas.role);
 
        if (this.datas.role === 'Admin') {
          this.route.navigateByUrl('/admin');
        } else if (this.datas.role === 'Customer') {
          this.route.navigateByUrl('/customer');
        }
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.showErrorMessage = true;
      }
    });
  }
 
  RefreshLogin() {
    location.reload();
  }
}
