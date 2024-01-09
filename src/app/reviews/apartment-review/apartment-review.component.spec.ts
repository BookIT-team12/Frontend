import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentReviewComponent } from './apartment-review.component';

describe('ApartmentReviewComponent', () => {
  let component: ApartmentReviewComponent;
  let fixture: ComponentFixture<ApartmentReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentReviewComponent]
    });
    fixture = TestBed.createComponent(ApartmentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
