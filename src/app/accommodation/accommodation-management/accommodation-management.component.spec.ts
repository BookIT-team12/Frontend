import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationManagementComponent } from './accommodation-management.component';


describe('AccommodationManagementComponent', () => {
  let component: AccommodationManagementComponent;
  let fixture: ComponentFixture<AccommodationManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationManagementComponent]
    });
    fixture = TestBed.createComponent(AccommodationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
