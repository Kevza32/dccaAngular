import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchCityComponent } from './modal-search-city.component';

describe('ModalSearchCityComponent', () => {
  let component: ModalSearchCityComponent;
  let fixture: ComponentFixture<ModalSearchCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
