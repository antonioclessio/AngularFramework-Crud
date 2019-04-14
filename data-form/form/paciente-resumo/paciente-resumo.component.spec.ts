import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteResumoComponent } from './paciente-resumo.component';

describe('PacienteResumoComponent', () => {
  let component: PacienteResumoComponent;
  let fixture: ComponentFixture<PacienteResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
