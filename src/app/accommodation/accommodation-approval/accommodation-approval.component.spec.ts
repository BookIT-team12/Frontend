import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationApprovalComponent } from './accommodation-approval.component';

describe('AccommodationApprovalComponent', () => {
  let component: AccommodationApprovalComponent;
  let fixture: ComponentFixture<AccommodationApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationApprovalComponent]
    });
    fixture = TestBed.createComponent(AccommodationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
