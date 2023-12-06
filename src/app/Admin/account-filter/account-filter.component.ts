import { Component } from "@angular/core";
import { AccountServiceService } from "src/app/service/account-service.service";

@Component({
  selector: "app-account-filter",
  templateUrl: "./account-filter.component.html",
  styleUrls: ["./account-filter.component.css"],
})
export class AccountFilterComponent {
  constructor(private auth: AccountServiceService) {}

  accounts: any[] = [];
  FilterData: any;
  resultcondition = false;
  resultArray = false;
  FilterAccount() {
    this.auth.AccountFilter(this.FilterData).subscribe({
      next: (data: any) => {
        if (
          data === null ||
          (typeof data === "object" && Object.keys(data).length === 0)
        ) {
          this.resultcondition = false;
          this.resultArray = true;
        } else if (Array.isArray(data)) {
          this.accounts = data;
          console.log(data);
          this.resultcondition = true;
        } else {
          console.error("Unexpected data format:", data);
        }
      },
    });
  }
}
