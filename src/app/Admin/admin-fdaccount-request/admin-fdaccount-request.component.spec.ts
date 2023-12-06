import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFdaccountRequestComponent } from './admin-fdaccount-request.component';

describe('AdminFdaccountRequestComponent', () => {
  let component: AdminFdaccountRequestComponent;
  let fixture: ComponentFixture<AdminFdaccountRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFdaccountRequestComponent]
    });
    fixture = TestBed.createComponent(AdminFdaccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
