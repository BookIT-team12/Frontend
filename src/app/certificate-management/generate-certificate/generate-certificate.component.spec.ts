import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCertificateComponent } from './generate-certificate.component';

describe('GenerateCertificateComponent', () => {
  let component: GenerateCertificateComponent;
  let fixture: ComponentFixture<GenerateCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateCertificateComponent]
    });
    fixture = TestBed.createComponent(GenerateCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
