import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOwnerComponent } from './navbar-owner.component';

describe('NavbarOwnerComponent', () => {
  let component: NavbarOwnerComponent;
  let fixture: ComponentFixture<NavbarOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarOwnerComponent]
    });
    fixture = TestBed.createComponent(NavbarOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
