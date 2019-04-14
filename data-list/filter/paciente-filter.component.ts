import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IFilterComponent } from '@clessit/ngx-appbuilder';
import { EnumService } from '../../../../common/enum/enum.service';

@Component({
  selector: 'paciente-filter',
  templateUrl: './paciente-filter.component.html'
})
export class PacienteFilterComponent implements IFilterComponent, OnInit {
  form: FormGroup;
  statusItensList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private enumHelper: EnumService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.statusItensList = this.enumHelper.getStatusDefault();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      Status: [null, null ],
      Nome: [null, null],
      Codigo: [null, null],
      ConsiderarInativos: [null, null],
      CPF: [null, null],
      RG: [null, null],
      IdPacienteStatus: [null, null],
      SomenteAvaliacao: [null, null]
  });
  }
}
