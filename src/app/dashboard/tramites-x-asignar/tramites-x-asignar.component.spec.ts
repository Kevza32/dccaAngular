import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesXAsignarComponent } from './tramites-x-asignar.component';

describe('TramitesXAsignarComponent', () => {
  let component: TramitesXAsignarComponent;
  let fixture: ComponentFixture<TramitesXAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramitesXAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesXAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
