import { TestBed } from '@angular/core/testing';

import { GetdatapointService } from './getdatapoint.service';

describe('GetdatapointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetdatapointService = TestBed.get(GetdatapointService);
    expect(service).toBeTruthy();
  });
});
