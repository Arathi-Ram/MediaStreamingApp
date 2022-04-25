import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRootuserComponent } from './dashboard-rootuser.component';

describe('DashboardRootuserComponent', () => {
  let component: DashboardRootuserComponent;
  let fixture: ComponentFixture<DashboardRootuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRootuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRootuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
