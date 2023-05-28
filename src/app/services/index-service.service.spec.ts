import { TestBed } from '@angular/core/testing';

import { IndexServiceService } from './index-service.service';

describe('IndexServiceService', () => {
  let service: IndexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
