import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupdataConnection } from './popupdataconnection.component';

describe('TosourceComponent', () => {
  let component: PopupdataConnection;
  let fixture: ComponentFixture<PopupdataConnection>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupdataConnection]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupdataConnection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
