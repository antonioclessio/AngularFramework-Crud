import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDadosBasicosComponent } from './paciente-dados-basicos.component';

describe('PacienteDadosBasicosComponent', () => {
  let component: PacienteDadosBasicosComponent;
  let fixture: ComponentFixture<PacienteDadosBasicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteDadosBasicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDadosBasicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
