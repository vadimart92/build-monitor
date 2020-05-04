import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildMonitorComponent } from './build-monitor.component';

describe('BuildMonitorComponent', () => {
  let component: BuildMonitorComponent;
  let fixture: ComponentFixture<BuildMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
