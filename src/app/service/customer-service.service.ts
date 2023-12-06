import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

customerRegisterUrl="https://localhost:7113/api/Customers/customerRegister";

showAllCustomerUrl="https://localhost:7113/api/Customers";

getCustomerByIdUrl="https://localhost:7113/api/Customers";

passbookViewUrl="https://localhost:7113/api/Customer/passbook?id";

askQueryUrl="https://localhost:7113/api/Query/customerAskQuery";

updateCustoemrUrl="https://localhost:7113/api/Customers"
deleteCustomerUrl = "https://localhost:7113/api/Customers";

paginationUrl="";

twoDateFilterUrl="https://localhost:7113/api/Transaction/DateFilter"//need to modify 

fetchCustomerDetailsUrl="https://localhost:7113/api/Customers/customerDataFetch"//for customer fetching

  constructor(private http:HttpClient) { }

public RegisterCustomer(data:any)
{
  return this.http.post(this.customerRegisterUrl,data)
}

public ViewPassBook(id:any)
{
  return this.http.get(this.passbookViewUrl+"="+id) 
}

public AskCustomerQuery(data:any)
{
  return this.http.post(this.askQueryUrl,data)
}

public SHowAllCustomer()
{
  return this.http.get(this.showAllCustomerUrl)
}
public getCustomerById(id:any)
{
  return this.http.get(this.getCustomerByIdUrl+"/"+id)
}

public getCustomersById(id:any)
{
  return this.http.get(this.fetchCustomerDetailsUrl+"/"+id)
}



public paginationBank(pgNo ?:number,pgSize?:number)
{
return this.http.get(this.paginationUrl+ "?PageNumber=" +pgNo + "&PageSize=" +pgSize ,
{ observe: 'response' })
}

public twoDateFilter(data:any)
{
  
  return this.http.post(this.twoDateFilterUrl,data)
}

public UpdateCustomer(data:any)
{
 return this.http.put(this.updateCustoemrUrl,data)
}
public DeleteCustomer(customerId: number) {
  return this.http.delete(`${this.deleteCustomerUrl}/${customerId}`);
}

}
