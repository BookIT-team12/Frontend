import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentReportComponent } from './apartment-report.component';

describe('ApartmentReportComponent', () => {
  let component: ApartmentReportComponent;
  let fixture: ComponentFixture<ApartmentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentReportComponent]
    });
    fixture = TestBed.createComponent(ApartmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
