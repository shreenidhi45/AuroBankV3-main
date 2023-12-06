import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = 'https://localhost:7113/api/Login/login';
 
  constructor(private http: HttpClient) {}
 
  login(data: any): Observable<any> {
    return this.http.post(this.url, data, { observe: 'response' });
  }
}
