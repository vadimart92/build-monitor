import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildScreenComponent } from './build-screen.component';

describe('BuildMonitorComponent', () => {
  let component: BuildScreenComponent;
  let fixture: ComponentFixture<BuildScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
