import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderViewComponent } from './single-order-view.component';

describe('SingleOrderViewComponent', () => {
  let component: SingleOrderViewComponent;
  let fixture: ComponentFixture<SingleOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
