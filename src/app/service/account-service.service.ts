import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  accountFilterTransactionUrl="https://localhost:7113/api/Accounts/TransactionFilter";

  accountRequestAdminUrl="https://localhost:7113/api/Accounts/customerAccountRequest";

  getAccountRequestUrl= "https://localhost:7113/api/Accounts/accounRequest";

  getAccountIdByCustomerIdUrl="https://localhost:7113/api/Accounts/customerIdAccountIdget"
  deleteByAccountIdUrl="https://localhost:7078/api/Account"
 
  setAccountInterestAdminUrl="https://localhost:7113/api/Accounts/AccountIntrestUpdate"

  activateAccountByIdUrl="https://localhost:7113/api/Accounts/activeId"

  showActiveAccountUrl="https://localhost:7113/api/Accounts/activeAccounts"

  acceptAccountRequestUrl="https://localhost:7113/api/Accounts"
  requestFDAccountsUrl = "https://localhost:7113/api/Accounts/requestFdAccounts"

  fetchAccounDetailsUrl="https://localhost:7113/api/Accounts"
  approveFDRequestUrl = "https://localhost:7113/api/Accounts/getAllRequestedFD"

  activateFDAccountUrl = "https://localhost:7113/api/Accounts/activateFDAccount"

  fetchFDAccountDetailsUrl = "https://localhost:7113/api/Accounts/acountIdFetchFDAccount"
  constructor(private http:HttpClient) { }

public AccountFilter(id:any)
{
  return this.http.get(this.accountFilterTransactionUrl+"/"+id);
}
public showActiveAccounts() {
  return this.http.get(this.showActiveAccountUrl);
}

public RequestAccount(data:any)
{
  return this.http.post(this.accountRequestAdminUrl,data)
}
public ShowAccountRequest()
{
  return this.http.get(this.getAccountRequestUrl)
}
public FetchAccount(id:any)
{
  return this.http.get(this.fetchAccounDetailsUrl+"/"+id)
}
public setAccountInterest(data:any)
{
  return this.http.post(this.setAccountInterestAdminUrl,data)
}

public AccountIdGetByCustomerId(id:any)
{
  return this.http.get(this.getAccountIdByCustomerIdUrl+"/"+id)
}

public ActivateAccountById(id:any)
{
  return this.http.get(this.activateAccountByIdUrl+"/"+id)
}
public AcceptAccountRequest(accountNumber: number) {
  return this.http.put(`${this.acceptAccountRequestUrl}/${accountNumber}/activate`, null);
}
public CustomerRequestFD(data:any)
{
  return this.http.post(this.requestFDAccountsUrl,data)
}

public AdminShowFDAccounts()
{
  return this.http.get(this.approveFDRequestUrl)
}

public ActivateFDAccountById(id:any)
{
  return this.http.get(this.activateFDAccountUrl+"/"+id)
}

public DenielAccount(data:any)
{
  return this.http.delete(this.deleteByAccountIdUrl+"/"+data)
}
public FetchFDAccountFromAccountID(id:any)
{
  return this.http.get(this.fetchFDAccountDetailsUrl+"/"+id)
}



}

