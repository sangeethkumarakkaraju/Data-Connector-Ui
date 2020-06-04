import { TestBed } from '@angular/core/testing';

import { SalesforceapiService } from './salesforceapi.service';

describe('SalesforceapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesforceapiService = TestBed.get(SalesforceapiService);
    expect(service).toBeTruthy();
  });
});
