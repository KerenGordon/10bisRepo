import { TestBed } from '@angular/core/testing';

import { ExhttpService } from './exhttp.service';

describe('ExhttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhttpService = TestBed.get(ExhttpService);
    expect(service).toBeTruthy();
  });
});
