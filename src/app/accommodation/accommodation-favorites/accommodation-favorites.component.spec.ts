import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationFavoritesComponent } from './accommodation-favorites.component';

describe('AccommodationFavoritesComponent', () => {
  let component: AccommodationFavoritesComponent;
  let fixture: ComponentFixture<AccommodationFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationFavoritesComponent]
    });
    fixture = TestBed.createComponent(AccommodationFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
