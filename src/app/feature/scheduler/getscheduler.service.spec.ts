import { TestBed } from '@angular/core/testing';

import { GetschedulerService } from './getscheduler.service';

describe('GetschedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetschedulerService = TestBed.get(GetschedulerService);
    expect(service).toBeTruthy();
  });
});
