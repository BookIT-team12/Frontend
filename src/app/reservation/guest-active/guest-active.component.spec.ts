import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestActiveComponent } from './guest-active.component';

describe('GuestActiveComponent', () => {
  let component: GuestActiveComponent;
  let fixture: ComponentFixture<GuestActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestActiveComponent]
    });
    fixture = TestBed.createComponent(GuestActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
