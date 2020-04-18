import { TestBed } from '@angular/core/testing';

import { AdddataconnectionService } from './adddataconnection.service';

describe('AdddataconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdddataconnectionService = TestBed.get(AdddataconnectionService);
    expect(service).toBeTruthy();
  });
});
