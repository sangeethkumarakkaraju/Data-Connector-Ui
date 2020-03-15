import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConnectionComponent } from './data-connection.component';

describe('DataConnectionComponent', () => {
  let component: DataConnectionComponent;
  let fixture: ComponentFixture<DataConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
