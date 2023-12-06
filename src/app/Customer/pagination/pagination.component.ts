import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerServiceService } from 'src/app/service/customer-service.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  paginator: any;
  dataSource: any;
  currentPage: any;
  removeBank:any;
  pageSize: any;

  headers: any;
  bankData: any;

  constructor(private auth: CustomerServiceService) {}

  showBankData(pageNumber: number, pageSize: number) {
    console.log("working");
    this.auth.paginationBank(pageNumber, pageSize).subscribe(
      {
        next: (response) => {
          this.headers = response.headers.get('x-Pagination');
          this.bankData = response.body;
          this.headers = JSON.parse(this.headers);
          // Assuming the paginator is an object with appropriate properties
          this.paginator.length = this.headers.TotalCount;
          this.paginator.pageIndex = this.currentPage;
          // Assuming MatTableDataSource is not used, use this.dataSource as per your data structure
          this.dataSource = this.bankData;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    this.removeBank = this.auth;
  }

  pageChanged(event: any) {
    this.pageSize = event.itemsPerPage;
    this.currentPage = event.page;
    this.showBankData(this.currentPage + 1, this.pageSize);
  }




}
