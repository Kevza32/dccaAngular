import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserWorkGroupComponent } from './add-user-work-group.component';

describe('AddUserWorkGroupComponent', () => {
  let component: AddUserWorkGroupComponent;
  let fixture: ComponentFixture<AddUserWorkGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserWorkGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserWorkGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
