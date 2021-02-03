import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseBuildInfoComponent } from './base-build-info.component';
import {BuildInfo} from "../data-contracts";

describe('BaseBuildInfoComponent', () => {
  let component: BaseBuildInfoComponent<BuildInfo>;
  let fixture: ComponentFixture<BaseBuildInfoComponent<BuildInfo>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseBuildInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseBuildInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
