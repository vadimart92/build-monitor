import { TestBed } from '@angular/core/testing';

import { BuildServerService } from './build-server.service';

describe('BuildServerService', () => {
  let service: BuildServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
