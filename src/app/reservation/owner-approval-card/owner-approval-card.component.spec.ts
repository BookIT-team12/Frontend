import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApprovalCardComponent } from './owner-approval-card.component';

describe('OwnerApprovalCardComponent', () => {
  let component: OwnerApprovalCardComponent;
  let fixture: ComponentFixture<OwnerApprovalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerApprovalCardComponent]
    });
    fixture = TestBed.createComponent(OwnerApprovalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
