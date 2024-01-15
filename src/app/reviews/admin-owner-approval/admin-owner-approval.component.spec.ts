import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOwnerApprovalComponent } from './admin-owner-approval.component';

describe('AdminOwnerApprovalComponent', () => {
  let component: AdminOwnerApprovalComponent;
  let fixture: ComponentFixture<AdminOwnerApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOwnerApprovalComponent]
    });
    fixture = TestBed.createComponent(AdminOwnerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
