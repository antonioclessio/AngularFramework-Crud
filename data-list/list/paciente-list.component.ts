import { Component, OnInit, EventEmitter } from '@angular/core';

import {
  DataGridColumn,
  DataGridConfiguration,
  IListComponent,
  OnSearch,
  APP_TOTAL_LENGTH_TO_SEARCH
} from '@clessit/ngx-appbuilder';

import { PacienteService } from '../../paciente.service';

@Component({
  selector: 'paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements IListComponent, OnInit, OnSearch {

  dataGridConfig: DataGridConfiguration;
  dataSourceGrid: any = null;
  searchCriteria: string = null;
  selectedKey: EventEmitter<number> = new EventEmitter<number>();
  selectedAction: EventEmitter<any> = new EventEmitter<any>();
  doubleClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: PacienteService) {
    this.dataGridConfiguration();
  }

  ngOnInit(): void {
    this.loadDataSource();
  }

  loadDataSource(): void {
    this.http.getAll().subscribe(response => this.dataSourceGrid = response.Data);
  }

  dataGridConfiguration(): void {
    const columns: DataGridColumn[] = [
      new DataGridColumn('Status', '15%', 'DescricaoStatus', { sortable: true }),
      new DataGridColumn('Código', '15%', 'CodigoFormatado', { sortable: true, ignoreCamelCase: true }),
      new DataGridColumn('Nome', '50%', 'Nome', { sortable: true }),
      new DataGridColumn('CPF', '20%', 'CPFFormatado', { sortable: true })
    ];

    this.dataGridConfig = new DataGridConfiguration(columns, 'IdPaciente');
    this.dataGridConfig.hasActions = false;
    this.dataGridConfig.useCamelCase = true;
  }

  clOnSearch(e: any): void {
    if (typeof e === 'object') {
      this.http.getByFilter(e).subscribe(response => this.dataSourceGrid = response.Data);
    } else {
      this.searchCriteria = e;
      if (e.length >= APP_TOTAL_LENGTH_TO_SEARCH) {
        // TODO Fazer a pesquisa no server
      }
    }
  }

  onRowSelected(e: any) {
    this.selectedKey.emit(e);
  }

  onDoubleClick(e: number): void {
    this.doubleClick.emit(e);
  }

  onActionSelected(e: any): void {
    this.selectedAction.emit({ 'button': e.buttonItem, 'selectedKey': e.dataItem.IdProduto });
  }
}
