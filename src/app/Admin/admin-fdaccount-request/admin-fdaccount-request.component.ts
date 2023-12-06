import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DocumentServiceService } from 'src/app/service/document-service.service';
import {Modal } from 'bootstrap';

@Component({
  selector: 'app-admin-fdaccount-request',
  templateUrl: './admin-fdaccount-request.component.html',
  styleUrls: ['./admin-fdaccount-request.component.css']
})
export class AdminFdaccountRequestComponent {
  @ViewChild('documentModal') private modalElement!: ElementRef;
  private modal!: Modal;


  refreshfun() {
    console.log('refreshfun called');
    location.reload();
  }
  accounts: any[] = [];
  showAccountNotFound = false
  accountRequestTrue = false
  constructor(private auth: AccountServiceService, private doc: DocumentServiceService, private sanitizer: DomSanitizer) {
    this.auth.AdminShowFDAccounts().subscribe(
      {
        next: (data: any) => {
         console.log(data);
         
          
          this.accounts = data;
          this.accountRequestTrue = true
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching accounts:', error);
          this.showAccountNotFound = true
          this.accountRequestTrue = false
        }
      }
    );
  }

  ngAfterViewInit() { 
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  confirmAccept(accountNumber: number): void 
  {
    const isConfirmed = window.confirm('Are you sure you want to Accept');
  
    if (isConfirmed) {
      this.acceptAccount(accountNumber);
    } else {
      // User canceled, do nothing or handle accordingly
    }

  }
 

  acceptAccount(account: any) {
    this.auth.ActivateFDAccountById(account).subscribe(
      {
        next: (res) => {
          alert("Account Activated Successfully.")
          location.reload()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);


        }
      }
    )
  }
  ViewDoc(id:any){

  }
 


  // Assuming 'documents' is an array of bytes representing the image
  searchForm: FormGroup = new FormGroup({
    documentId: new FormControl(''),
  });
  documents: any;
  imageSource: any
  documentDetails: any
  showCustomerNotUploaded: any
  searchSubmit(data: any) {
    console.log(data);
    
        this.doc.GetuploadDocument(data.documentId).subscribe(
          {
            next: (responce: ArrayBuffer) => {
    
              const base64Image = this.arrayBufferToBase64(responce);
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${base64Image}`);
              this.modal.show();
    
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.showCustomerNotUploaded = true
    
            }
          }
        )
    
    
      }

 

  onSubmit(data: any) {
console.log(data);

    this.doc.GetuploadDocument(data).subscribe(
      {
        next: (responce: ArrayBuffer) => {

          const base64Image = this.arrayBufferToBase64(responce);
          this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${base64Image}`);
          this.modal.show();

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.showCustomerNotUploaded = true

        }
      }
    )


  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  searchCustomerId: any


  close() {
    this.imageSource = null
    if (this.modal) {
      this.modal.hide();
  }

}



//onDenial
showDeleteData:any


confirmDenial(accountNumber: number): void {
  const isConfirmed = window.confirm('Are you sure you want to deny?');

  if (isConfirmed) {
    this.onDenial(accountNumber);
  } else {
    // User canceled, do nothing or handle accordingly
  }
}

onDenial(data:any)
{

this.auth.DenielAccount(data).subscribe(
  {
  next:(data)=>
  {this.showDeleteData=data
    alert("SuccessFully Delete ")
    location.reload()
  },
  error:(err:HttpErrorResponse)=>
  {
    console.log(err.error.message);
    
  }
  
  }
)
}
}
