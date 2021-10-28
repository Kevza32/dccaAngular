import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbebedComponent } from './embebed.component';

describe('EmbebedComponent', () => {
  let component: EmbebedComponent;
  let fixture: ComponentFixture<EmbebedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbebedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbebedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
