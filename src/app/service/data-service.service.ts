import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor() {
    this.loadUserDataFromLocalStorage();
  }
 
  private _userName: string = '';
  private _userId: number = 0;
  private _customerId: number = 0;
  private _accountId: number = 0;
  private _role: string = '';
 
  set role(value: string) {
    this._role = value;
    this.updateUserDataInLocalStorage();
  }
 
  get role(): string {
    return this._role;
  }
 
  set userName(value: string) {
    this._userName = value;
    this.updateUserDataInLocalStorage();
  }
 
  get userName(): string {
    return this._userName;
  }
 
  set customerId(value: number) {
    this._customerId = value;
    this.updateUserDataInLocalStorage();
  }
 
  get customerId(): number {
    return this._customerId;
  }
 
  set userId(value: number) {
    this._userId = value;
    this.updateUserDataInLocalStorage();
  }
 
  get userId(): number {
    return this._userId;
  }
 
  set accountId(value: number) {
    this._accountId = value;
    this.updateUserDataInLocalStorage();
  }
 
  get accountId(): number {
    return this._accountId;
  }
 
  private updateUserDataInLocalStorage() {
    const userData = {
      userName: this._userName,
      userId: this._userId,
      customerId: this._customerId,
      accountId: this._accountId,
      role: this._role
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }
 
  private loadUserDataFromLocalStorage() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this._userName = userData.userName || '';
      this._userId = userData.userId || 0;
      this._customerId = userData.customerId || 0;
      this._accountId = userData.accountId || 0;
      this._role = userData.role || '';
    }
  }
 
  // Logout
  logout() {
    this._userName = '';
    this._userId = 0;
    this._customerId = 0;
    this._accountId = 0;
    this._role = '';
 
    this.updateUserDataInLocalStorage();
  }
}
