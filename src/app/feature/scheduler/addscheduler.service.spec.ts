import { TestBed } from '@angular/core/testing';

import { AddschedulerService } from './addscheduler.service';

describe('AddschedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddschedulerService = TestBed.get(AddschedulerService);
    expect(service).toBeTruthy();
  });
});
