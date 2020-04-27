import { TestBed } from '@angular/core/testing';

import { GetjobhistoryService } from './getjobhistory.service';

describe('GetjobhistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetjobhistoryService = TestBed.get(GetjobhistoryService);
    expect(service).toBeTruthy();
  });
});
