import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisConveniosLiquidacionComponent } from './mis-convenios-liquidacion.component';

describe('MisConveniosLiquidacionComponent', () => {
  let component: MisConveniosLiquidacionComponent;
  let fixture: ComponentFixture<MisConveniosLiquidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisConveniosLiquidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisConveniosLiquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
