import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteProntuarioComponent } from './paciente-prontuario.component';

describe('PacienteProntuarioComponent', () => {
  let component: PacienteProntuarioComponent;
  let fixture: ComponentFixture<PacienteProntuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteProntuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
