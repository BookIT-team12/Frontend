import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNonRegisteredMainComponent } from './navbar-non-registered-main.component';

describe('NavbarNonRegisteredMainComponent', () => {
  let component: NavbarNonRegisteredMainComponent;
  let fixture: ComponentFixture<NavbarNonRegisteredMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarNonRegisteredMainComponent]
    });
    fixture = TestBed.createComponent(NavbarNonRegisteredMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
