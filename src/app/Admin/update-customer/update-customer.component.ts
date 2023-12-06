import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  fetchSingleData: any = {};
  UpdateCustomer = false; // Initialize to false
  dataStore: any;

  // Define the form group
  customerRegisterForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userId: new FormControl('', [Validators.required])
  });
  newId: any;

  // Getters for form controls
  get firstNameValidator() {
    return this.customerRegisterForm.get('firstName');
  }

  get lastNameValidator() {
    return this.customerRegisterForm.get('lastName');
  }

  get emailValidator() {
    return this.customerRegisterForm.get('email');
  }

  get userValidatorId() {
    return this.customerRegisterForm.get('userId');
  }

  constructor(private auth: CustomerServiceService) {}

  ngOnInit() {
    // Fetch initial data on component initialization
    this.auth.SHowAllCustomer().subscribe({
      next: (data) => {
        this.dataStore = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  selectedData(eventIdPass: any) {
    // Fetch data for the selected customer
    this.auth.getCustomerById(eventIdPass.target.value).subscribe({
      next: (data) => {
        console.log()
        this.fetchSingleData = data;

        // Populate the form with the fetched data
        this.customerRegisterForm.patchValue({
          customerId: this.fetchSingleData.customerId,
          firstName: this.fetchSingleData.firstName,
          lastName: this.fetchSingleData.lastName,
          email: this.fetchSingleData.email,
          userId: this.fetchSingleData.userId
        });

        // Show the update form
        this.UpdateCustomer = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  submitData(formData: any) {
    // Update the customer
    this.auth.UpdateCustomer(formData).subscribe({
      next: (data) => {
        alert('Customer successfully updated');
        console.log(data);

        // Hide the update form after successful update
        this.UpdateCustomer = false;

        // Clear the form
        this.customerRegisterForm.reset();
        location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  deleteCustomer(customer: any) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this customer?')) {
      // Set isActive to false and update the customer
      customer.isActive = false;

      // Call the DeleteCustomer method to delete the customer on the server
      this.auth.DeleteCustomer(customer.customerId).subscribe({
        next: (response) => {
          alert('Customer deleted successfully');

          // Refresh the customer list after deletion
          this.auth.SHowAllCustomer().subscribe((data) => {
            this.dataStore = data;
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

  showUpdateForm(data:any) {
    this.newId= data
    // Show the update form without fetching any data
    this.UpdateCustomer = true;
    
  }
  
}