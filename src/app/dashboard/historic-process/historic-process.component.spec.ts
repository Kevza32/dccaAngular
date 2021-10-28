import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricProcessComponent } from './historic-process.component';

describe('HistoricProcessComponent', () => {
  let component: HistoricProcessComponent;
  let fixture: ComponentFixture<HistoricProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
