import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBuildInfoComponent } from './base-build-info.component';

describe('BaseBuildInfoComponent', () => {
  let component: BaseBuildInfoComponent;
  let fixture: ComponentFixture<BaseBuildInfoComponent>;

  beforeEach(async(() => {
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
