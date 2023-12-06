import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsMainComponent } from './accommodations-main.component';

describe('AccommodationsMainComponent', () => {
  let component: AccommodationsMainComponent;
  let fixture: ComponentFixture<AccommodationsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationsMainComponent]
    });
    fixture = TestBed.createComponent(AccommodationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
