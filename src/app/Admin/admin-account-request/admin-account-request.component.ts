import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { AccountServiceService } from "src/app/service/account-service.service";
import { DocumentServiceService } from "src/app/service/document-service.service";

@Component({
  selector: "app-admin-account-request",
  templateUrl: "./admin-account-request.component.html",
  styleUrls: ["./admin-account-request.component.css"],
})
export class AdminAccountRequestComponent {
  accounts: any[] = [];
  showAccountNotFound = false;
  accountRequestTrue = false;
  documents: any;
  imageSource: any;
  documentDetails: any;
  showCustomerNotUploaded: any;

  searchForm: FormGroup = new FormGroup({
    documentId: new FormControl(''),
  });

  constructor(
    private auth: AccountServiceService,
    private doc: DocumentServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.auth.ShowAccountRequest().subscribe(
      {
        next: (data: any) => {
          this.accounts = data;
          this.accountRequestTrue = true;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching accounts:', error);
          this.showAccountNotFound = true;
          this.accountRequestTrue = false;
        }
      }
    );
  }

  refreshfun() {
    console.log('refreshfun called');
    location.reload();
  }

  acceptAccount(account: any) {
    this.auth.AcceptAccountRequest(account.accountNumber).subscribe(
      {
        next: (res) => {
          alert("account Activated Successfully");
          location.reload();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  viewDocument(account: any) {
    // Your implementation for viewing the document
  }

  onSubmit(data: any) {
    this.doc.GetuploadDocument(data.documentId).subscribe(
      {
        next: (responce: ArrayBuffer) => {
          const base64Image = this.arrayBufferToBase64(responce);
          console.log('Base64 Image:', base64Image);
          this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${base64Image}`);
          console.log('Sanitized Image Source:', this.imageSource);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.showCustomerNotUploaded = true;
        }
      }
    );
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
  searchCustomerId:any


  close() {
    this.imageSource = false;
  }
}
