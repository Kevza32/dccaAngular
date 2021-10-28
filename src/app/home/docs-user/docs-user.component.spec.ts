import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsUserComponent } from './docs-user.component';

describe('DocsUserComponent', () => {
  let component: DocsUserComponent;
  let fixture: ComponentFixture<DocsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
