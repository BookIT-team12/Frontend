import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApprovalComponent } from './owner-approval.component';

describe('OwnerApprovalComponent', () => {
  let component: OwnerApprovalComponent;
  let fixture: ComponentFixture<OwnerApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerApprovalComponent]
    });
    fixture = TestBed.createComponent(OwnerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
