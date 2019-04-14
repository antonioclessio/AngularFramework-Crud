import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDataFormComponent } from './paciente-data-form.component';

describe('PacienteDataFormComponent', () => {
  let component: PacienteDataFormComponent;
  let fixture: ComponentFixture<PacienteDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
