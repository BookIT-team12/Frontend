import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCertificateRequestComponent } from './host-certificate-request.component';

describe('HostCertificateRequestComponent', () => {
  let component: HostCertificateRequestComponent;
  let fixture: ComponentFixture<HostCertificateRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostCertificateRequestComponent]
    });
    fixture = TestBed.createComponent(HostCertificateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
