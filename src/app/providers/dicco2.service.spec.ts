import { TestBed } from '@angular/core/testing';

import { Dicco2Service } from './dicco2.service';

describe('Dicco2Service', () => {
  let service: Dicco2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dicco2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
