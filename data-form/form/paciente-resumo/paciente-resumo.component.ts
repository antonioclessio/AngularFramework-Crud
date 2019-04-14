import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IBaseComponent, CamelCasePipe } from '@clessit/ngx-appbuilder';
import { PacienteService } from '../../../paciente.service';
import { GRAPH_FIRE } from '../../../../../common/graph-schemes.constants';

declare let $: any;

@Component({
  selector: 'paciente-resumo',
  templateUrl: './paciente-resumo.component.html',
  styleUrls: ['./paciente-resumo.component.scss']
})
export class PacienteResumoComponent implements IBaseComponent, OnChanges {

    @Input('data') dataSource: any = null;

    @Output() satisfacao: EventEmitter<any> = new EventEmitter<any>();

    dataSourceSatisfacao: any = null;
    dataSourceContaReceber_Pago_Detalhes: any = null;
    dataSourceAgenda: any = null;
    dataSourceDatasGerais: any = null;
    totalParcelasGeradas: number = 0;
    alertaParcelasGeradas: number = 1;

    colorScheme: any = GRAPH_FIRE;
    widthGraph: any[] = [140, 140];
    barPadding = 8;

    constructor(
    private pacienteService: PacienteService
    ) { }

    ngOnChanges(e: SimpleChanges) {
        if (e.dataSource && this.dataSource && this.dataSource.IdPaciente > 0) {
            this.onLoadDataSource();
        }
    }

    onLoadDataSource(): void {
        this.pacienteService.getResumo(this.dataSource.IdPaciente).subscribe((response: any) => {
            this.dataSourceContaReceber_Pago_Detalhes = response.Data.ContaReceber_Pago_Detalhes;
            this.dataSourceSatisfacao = response.Data.Satisfacao;
            this.dataSourceDatasGerais = response.Data.DatasGerais;
            this.dataSourceAgenda = response.Data.Agenda;
            this.totalParcelasGeradas = response.Data.TotalParcelasGeradas;
            this.alertaParcelasGeradas = response.Data.AlertaParcelasGeradas;

            this.satisfacao.emit(this.dataSourceSatisfacao);

            $('#chartResumoFrequencia' + this.dataSource.IdPaciente).kendoChart({
                dataSource: { data: response.Data.Frequencia },
                chartArea: { background: 'transparent' },
                legend: { position: 'left' },
                seriesDefaults: {
                    type: 'pie'
                },
                series: [{
                    field: 'Valor',
                    categoryField: 'Nome',
                    colorField: 'Cor'
                }],
                tooltip: {
                    visible: true,
                    template: '#= category #: #= value #'
                }
            });

            $('#chartResumoOcorrencia' + this.dataSource.IdPaciente).kendoChart({
                dataSource: { data: response.Data.Ocorrencia },
                chartArea: { background: 'transparent' },
                legend: { position: 'left' },
                seriesDefaults: {
                    type: 'pie'
                },
                series: [{
                    field: 'Valor',
                    categoryField: 'Nome'
                }],
                tooltip: {
                    visible: true,
                    template: '#= category #: #= value #'
                }
            });

            $('#chartConfiabilidadeFinanceira' + this.dataSource.IdPaciente).kendoChart({
                dataSource: { data: response.Data.ConfiancaFinanceira },
                chartArea: { background: 'transparent' },
                seriesDefaults: { type: 'column' },
                series: [{
                    field: 'Valor',
                    categoryField: 'Descricao',
                    colorField: 'Cor'
                }],
                valueAxis: {
                    labels: {
                        format: '{0}%'
                    },
                    line: {
                        visible: false
                    },
                    majorGridLines: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: '#= value #%'
                }
            });

            $('#chartConfiabilidadeFrequencia' + this.dataSource.IdPaciente).kendoChart({
                dataSource: { data: response.Data.ConfiancaFrequencia },
                chartArea: { background: 'transparent' },
                seriesDefaults: { type: 'column' },
                series: [{
                    field: 'Valor',
                    categoryField: 'Descricao',
                    colorField: 'Cor'
                }],
                valueAxis: {
                    labels: {
                        format: '{0}%'
                    },
                    line: {
                        visible: false
                    },
                    majorGridLines: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: '#= value #%'
                }
            });

        });
    }

}
