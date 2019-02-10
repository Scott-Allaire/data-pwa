import { TestBed } from '@angular/core/testing';

import { ReadingsService } from './readings.service';

describe('ReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadingsService = TestBed.get(ReadingsService);
    expect(service).toBeTruthy();
  });
});
