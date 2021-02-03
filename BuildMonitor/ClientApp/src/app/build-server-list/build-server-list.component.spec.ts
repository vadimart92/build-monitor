import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildServerListComponent } from './build-server-list.component';

describe('BuildServerListComponent', () => {
  let component: BuildServerListComponent;
  let fixture: ComponentFixture<BuildServerListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildServerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildServerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
