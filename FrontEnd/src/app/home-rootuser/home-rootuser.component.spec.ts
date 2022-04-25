import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRootuserComponent } from './home-rootuser.component';

describe('HomeRootuserComponent', () => {
  let component: HomeRootuserComponent;
  let fixture: ComponentFixture<HomeRootuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRootuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRootuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
