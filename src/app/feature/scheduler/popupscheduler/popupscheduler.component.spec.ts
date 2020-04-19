import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupschedulerComponent } from './popupscheduler.component';

describe('PopupschedulerComponent', () => {
  let component: PopupschedulerComponent;
  let fixture: ComponentFixture<PopupschedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupschedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupschedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
