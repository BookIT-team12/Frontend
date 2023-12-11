import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationApprovalCardComponent } from './accommodation-approval-card.component';

describe('AccommodationApprovalCardComponent', () => {
  let component: AccommodationApprovalCardComponent;
  let fixture: ComponentFixture<AccommodationApprovalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationApprovalCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationApprovalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
