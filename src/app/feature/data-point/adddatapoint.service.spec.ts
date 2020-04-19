import { TestBed } from '@angular/core/testing';

import { AdddatapointService } from './adddatapoint.service';

describe('AdddatapointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdddatapointService = TestBed.get(AdddatapointService);
    expect(service).toBeTruthy();
  });
});
