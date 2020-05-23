import { TestBed } from '@angular/core/testing';

import { ProfileInfoService } from './profile-info.service';

describe('BuildInfoServiceService', () => {
  let service: ProfileInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
