import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFinanceiroComponent } from './paciente-financeiro.component';

describe('PacienteFinanceiroComponent', () => {
  let component: PacienteFinanceiroComponent;
  let fixture: ComponentFixture<PacienteFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
