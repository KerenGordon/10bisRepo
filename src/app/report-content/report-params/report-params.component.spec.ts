import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParamsComponent } from './report-params.component';

describe('ReportParamsComponent', () => {
  let component: ReportParamsComponent;
  let fixture: ComponentFixture<ReportParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
