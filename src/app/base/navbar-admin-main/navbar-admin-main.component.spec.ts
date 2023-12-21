import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdminMainComponent } from './navbar-admin-main.component';

describe('NavbarAdminMainComponent', () => {
  let component: NavbarAdminMainComponent;
  let fixture: ComponentFixture<NavbarAdminMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarAdminMainComponent]
    });
    fixture = TestBed.createComponent(NavbarAdminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
