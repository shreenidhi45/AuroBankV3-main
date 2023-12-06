import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBalanceComponent } from './customer-balance.component';

describe('CustomerBalanceComponent', () => {
  let component: CustomerBalanceComponent;
  let fixture: ComponentFixture<CustomerBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerBalanceComponent]
    });
    fixture = TestBed.createComponent(CustomerBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
