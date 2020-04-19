import { TestBed } from '@angular/core/testing';

import { GetdataconnectionService } from './getdataconnection.service';

describe('GetdataconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetdataconnectionService = TestBed.get(GetdataconnectionService);
    expect(service).toBeTruthy();
  });
});
