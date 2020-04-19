import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupdatapointComponent } from './popupdatapoint.component';

describe('FromsourceComponent', () => {
  let component: PopupdatapointComponent;
  let fixture: ComponentFixture<PopupdatapointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupdatapointComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupdatapointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
