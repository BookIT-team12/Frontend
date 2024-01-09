import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedPlacesComponent } from './visited-places.component';

describe('VisitedPlacesComponent', () => {
  let component: VisitedPlacesComponent;
  let fixture: ComponentFixture<VisitedPlacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitedPlacesComponent]
    });
    fixture = TestBed.createComponent(VisitedPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
