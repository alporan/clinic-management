import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientpanelComponent } from './patientpanel.component';

describe('PatientpanelComponent', () => {
  let component: PatientpanelComponent;
  let fixture: ComponentFixture<PatientpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
