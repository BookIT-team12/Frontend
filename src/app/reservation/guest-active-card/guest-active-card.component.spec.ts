import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestActiveCardComponent } from './guest-active-card.component';

describe('GuestActiveCardComponent', () => {
  let component: GuestActiveCardComponent;
  let fixture: ComponentFixture<GuestActiveCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestActiveCardComponent]
    });
    fixture = TestBed.createComponent(GuestActiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
