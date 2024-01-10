import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentApprovalComponent } from './admin-apartment-approval.component';

describe('AdminApartmentApprovalComponent', () => {
  let component: AdminApartmentApprovalComponent;
  let fixture: ComponentFixture<AdminApartmentApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApartmentApprovalComponent]
    });
    fixture = TestBed.createComponent(AdminApartmentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
