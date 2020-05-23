import { TestBed } from '@angular/core/testing';

import { UIProfileService } from './uiprofile.service';

describe('UIProfileService', () => {
  let service: UIProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
