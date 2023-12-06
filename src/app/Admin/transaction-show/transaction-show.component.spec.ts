import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionShowComponent } from './transaction-show.component';

describe('TransactionShowComponent', () => {
  let component: TransactionShowComponent;
  let fixture: ComponentFixture<TransactionShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionShowComponent]
    });
    fixture = TestBed.createComponent(TransactionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
