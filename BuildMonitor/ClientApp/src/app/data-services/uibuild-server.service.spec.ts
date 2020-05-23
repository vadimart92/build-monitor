import { TestBed } from '@angular/core/testing';

import { UIBuildServerService } from './uibuild-server.service';

describe('UIBuildServerService', () => {
  let service: UIBuildServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIBuildServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
