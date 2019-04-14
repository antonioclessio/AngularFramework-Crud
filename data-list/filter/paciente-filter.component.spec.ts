import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFilterComponent } from './paciente-filter.component';

describe('PacienteFilterComponent', () => {
  let component: PacienteFilterComponent;
  let fixture: ComponentFixture<PacienteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
