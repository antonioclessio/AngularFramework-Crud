import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteSatisfacaoComponent } from './paciente-satisfacao.component';

describe('PacienteSatisfacaoComponent', () => {
  let component: PacienteSatisfacaoComponent;
  let fixture: ComponentFixture<PacienteSatisfacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteSatisfacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteSatisfacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
