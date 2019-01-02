import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleItemViewComponent } from './single-item-view.component';

describe('SingleViewComponent', () => {
  let component: SingleItemViewComponent;
  let fixture: ComponentFixture<SingleItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
