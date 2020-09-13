import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDateInfoComponent } from './build-date-info.component';

describe('BuildDateInfoComponent', () => {
  let component: BuildDateInfoComponent;
  let fixture: ComponentFixture<BuildDateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildDateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildDateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
