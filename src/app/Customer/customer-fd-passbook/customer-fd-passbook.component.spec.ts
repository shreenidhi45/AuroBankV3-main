import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFdPassbookComponent } from './customer-fd-passbook.component';

describe('CustomerFdPassbookComponent', () => {
  let component: CustomerFdPassbookComponent;
  let fixture: ComponentFixture<CustomerFdPassbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFdPassbookComponent]
    });
    fixture = TestBed.createComponent(CustomerFdPassbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
