import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TcBuildInfoComponent } from './tc-build-info.component';

describe('TcBuildInfoComponent', () => {
  let component: TcBuildInfoComponent;
  let fixture: ComponentFixture<TcBuildInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TcBuildInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcBuildInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
