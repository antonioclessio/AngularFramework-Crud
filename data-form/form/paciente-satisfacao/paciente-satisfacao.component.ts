import { Component, Input } from '@angular/core';

@Component({
  selector: 'paciente-satisfacao',
  templateUrl: './paciente-satisfacao.component.html',
  styleUrls: ['./paciente-satisfacao.component.scss']
})
export class PacienteSatisfacaoComponent {

  @Input('data') dataSource: any = null;

  dataItem: any = null;

  constructor() { }

  showSatisfacao(e: any): void {
    this.dataItem = e;
  }

}
