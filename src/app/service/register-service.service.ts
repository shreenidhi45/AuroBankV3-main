import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  url="https://localhost:7113/api/Login/register"
  constructor(private http:HttpClient) { }

public register(data:any)
{
  return this.http.post(this.url,data);
}



}
