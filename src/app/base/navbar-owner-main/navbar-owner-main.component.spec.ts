import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOwnerMainComponent } from './navbar-owner-main.component';

describe('NavbarOwnerMainComponent', () => {
  let component: NavbarOwnerMainComponent;
  let fixture: ComponentFixture<NavbarOwnerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarOwnerMainComponent]
    });
    fixture = TestBed.createComponent(NavbarOwnerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
