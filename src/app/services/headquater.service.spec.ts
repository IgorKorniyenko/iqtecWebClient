import { TestBed } from '@angular/core/testing';

import { HeadquaterService } from './headquater.service';

describe('HeadquaterService', () => {
  let service: HeadquaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadquaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
