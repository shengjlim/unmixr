import { TestBed } from '@angular/core/testing';

import { BoseapiService } from './boseapi.service';

describe('BoseapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoseapiService = TestBed.get(BoseapiService);
    expect(service).toBeTruthy();
  });
});
