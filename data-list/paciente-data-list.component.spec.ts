import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDataListComponent } from './paciente-data-list.component';

describe('PacienteDataListComponent', () => {
  let component: PacienteDataListComponent;
  let fixture: ComponentFixture<PacienteDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
