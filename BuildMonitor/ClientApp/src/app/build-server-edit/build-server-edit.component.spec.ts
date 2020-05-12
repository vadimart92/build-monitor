import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildServerEditComponent } from './build-server-edit.component';

describe('BuildServerEditComponent', () => {
  let component: BuildServerEditComponent;
  let fixture: ComponentFixture<BuildServerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildServerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildServerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
