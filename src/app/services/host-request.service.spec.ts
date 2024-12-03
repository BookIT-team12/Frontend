import { TestBed } from '@angular/core/testing';

import { HostRequestService } from './host-request.service';

describe('HostRequestService', () => {
  let service: HostRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
