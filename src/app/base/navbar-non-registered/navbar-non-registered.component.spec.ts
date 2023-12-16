import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNonRegisteredComponent } from './navbar-non-registered.component';

describe('NavbarNonRegisteredComponent', () => {
  let component: NavbarNonRegisteredComponent;
  let fixture: ComponentFixture<NavbarNonRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarNonRegisteredComponent]
    });
    fixture = TestBed.createComponent(NavbarNonRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
