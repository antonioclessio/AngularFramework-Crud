import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IBaseComponent } from '@clessit/ngx-appbuilder';
import { EnumService } from '../../../../../common/enum/enum.service';
import { ProfissaoService } from '../../../../../cadastro/profissao/profissao.service';
import { ToastrService } from 'ngx-toastr';
import { MarketingService } from 'src/app/cadastro/marketing/marketing.service';
import { PacienteService } from '../../../paciente.service';
import { InstitutoRadiologiaService } from 'src/app/cadastro/instituto-radiologia/instituto-radiologia.service';

@Component({
  selector: 'paciente-dados-basicos',
  templateUrl: './paciente-dados-basicos.component.html',
  styleUrls: ['./paciente-dados-basicos.component.scss']
})
export class PacienteDadosBasicosComponent implements IBaseComponent, AfterViewInit {

  dataSource: any = null;

  listaSexo: any[] = [];
  listaEstadoCivil: any[] = [];
  listaProfissao: any[] = [];
  listaPacienteIndicacao: any[] = [];
  listaTipoEmail: any[] = [];
  listaTipoTelefone: any[] = [];
  listaTipoIndicacao: any[] = [];
  listaInstitutoRadiologia: any[] = [];
  listaMarketing: any[] = [];
  statusItensList: any[] = [];
  loadingProfissao: boolean = false;
  loadingPacienteIndicacao: boolean = false;

  marketingVinculaPaciente: boolean = false;

  @Input('NomeProfissao') placeHolderNomeProfissao: string = '- Selecione -';
  @Input('NomePacienteIndicacao') placeHolderNomePacienteIndicacao: string = '- Selecione -';
  @Input() idPaciente: number;
  @Input() form: FormGroup;
  @Input() dataSourceEmail: any = [];
  @Input() dataSourceTelefone: any = [];
  @Input('codigo') codigoCliente: string;
  @Input('endereco') dataSourceEndereco: any;

  @Output() updateEmail: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateTelefone: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private enumService: EnumService,
    private profissaoService: ProfissaoService,
    private marketingHttp: MarketingService,
    private pacienteService: PacienteService,
    private instituoRadiologiaService: InstitutoRadiologiaService,
    private toast: ToastrService
  ) {
    this.listaSexo = this.enumService.getSexo();
    this.statusItensList = this.enumService.getStatusDefault();
    this.listaEstadoCivil = this.enumService.getEstadoCivil();
    this.listaTipoEmail = this.enumService.getTipoEmail();
    this.listaTipoTelefone = this.enumService.getTipoTelefone();
    this.listaTipoIndicacao = this.enumService.getTipoIndicacao();

    this.marketingHttp.getAll().subscribe((response: any) => this.listaMarketing = response.Data);
    this.instituoRadiologiaService.getAll().subscribe((response: any) => this.listaInstitutoRadiologia = response.Data);
  }

  ngAfterViewInit(): void {
    this.form.get('IdMarketing').valueChanges.subscribe(response => {
      let marketing = this.listaMarketing.find(a => a.IdMarketing === parseInt(response, null));
      if (!marketing) { return; }
      
      this.marketingVinculaPaciente = marketing.VinculaPaciente;
    });
  }

  onSearchProfissao(e: any): void {
    if (!e || e.length < 3) { return; }

    this.loadingProfissao = true;
    this.profissaoService.autoComplete(e).subscribe((response: any) => {
      this.listaProfissao = response.Data;
      this.loadingProfissao = false;
    });
  }

  onSearchPacienteIndicacao(e: any): void {
    if (!e || e.length < 3) { return; }

    this.loadingPacienteIndicacao = true;
    this.pacienteService.autoComplete(e).subscribe((response: any) => {
      this.listaPacienteIndicacao = response.Data;
      this.loadingPacienteIndicacao = false;
    });
  }

  onSelectProfissao(e: any): void {
    if (!e) { return; }
    this.form.get('IdProfissao').setValue(e);
  }

  onSelectPacienteIndicacao(e: any): void {
    if (!e) { return; }
    this.form.get('IdPacienteIndicacao').setValue(e);
  }

  showMessageWarning(e: string): void {
    this.toast.warning(e);
  }

  showMessageError(e: string): void {
    this.toast.error(e);
  }

  onUpdateLocalizacaoGeografica(e: any): void {
    if (!e) { return; }
    this.form.get('IdLocalizacaoGeografica').setValue(e.IdLocalizacaoGeografica);
    this.form.get('NumeroEndereco').setValue(e.NumeroEndereco);
    this.form.get('Complemento').setValue(e.Complemento);
  }

  onUpdateListaEmail(e: any): void {
    this.dataSourceEmail = e;
    this.updateEmail.emit(this.dataSourceEmail);
  }

  onUpdateListaTelefone(e: any): void {
    this.dataSourceTelefone = e;
    this.updateTelefone.emit(this.dataSourceTelefone);
  }

}
