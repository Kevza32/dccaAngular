import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRubroPresupuestalFiltradoComponent } from './modal-rubro-presupuestal-filtrado.component';

describe('ModalRubroPresupuestalFiltradoComponent', () => {
  let component: ModalRubroPresupuestalFiltradoComponent;
  let fixture: ComponentFixture<ModalRubroPresupuestalFiltradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRubroPresupuestalFiltradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRubroPresupuestalFiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
