import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  ContentSwitchHItem,
  ContentSwitchItem,
  IFormComponent,
  OnBeforeSubmit,
  OnAfterLoadDataSource,
  ContentSwitchHService,
  StringLibrary
} from '@clessit/ngx-appbuilder';

import { CURRENT_LOCALE } from '../../../../common/app-common.constants';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/common/validators/custom.validator';

@Component({
  selector: 'paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss'],
  providers: [ ContentSwitchHService, StringLibrary ]
})
export class PacienteFormComponent implements IFormComponent, OnInit, OnBeforeSubmit, OnAfterLoadDataSource {

  dataSource: any;
  dataSourceEmail: any;
  dataSourceTelefone: any;
  dataSourceEndereco: any;
  dataSourceEspecialidade: any;
  dataSourceSatisfacao: any;
  dataSourceContentSwitch: ContentSwitchItem[] = [];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contentSwitchService: ContentSwitchHService,
    private toast: ToastrService,
    private stringLibrary: StringLibrary
  ) { }

  ngOnInit() {
    this.dataSourceContentSwitch.push(new ContentSwitchHItem('Cadastro', 'dados', true));

    this.createForm();
  }

  clOnAfterLoadDataSource(): void {
    this.dataSourceContentSwitch = [];
    this.dataSourceContentSwitch.push(new ContentSwitchHItem('Resumo', 'resumo', true));
    this.dataSourceContentSwitch.push(new ContentSwitchHItem('Cadastro', 'dados'));
    this.contentSwitchService.selectFirst();

    this.dataSourceEndereco = this.dataSource.LocalizacaoGeografica;
    if (this.dataSourceEndereco) {
      this.dataSourceEndereco.Complemento = this.dataSource.Complemento;
      this.dataSourceEndereco.NumeroEndereco = this.dataSource.NumeroEndereco;
    }
    this.dataSourceTelefone = this.dataSource.Telefones;
    this.dataSourceEmail = this.dataSource.Emails;

    this.setFormValue();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      IdPaciente: [0, [Validators.required]],
      Nome: [null, [
        Validators.required,
        CustomValidators.ownName
      ]],
      CPF: [null, [
        Validators.required,
        CustomValidators.cpf
      ]],
      RG: [null, [
        Validators.required,
      ]],
      DataNascimento: [null, [Validators.required]],
      Sexo: [null, [Validators.required]],
      EstadoCivil: [null, [Validators.required]],
      Nacionalidade: ['Brasileira', [Validators.required]],
      IdProfissao: [null, null],
      IdLocalizacaoGeografica: [null, null],
      NumeroEndereco: [null, null],
      Complemento: [null, null],
      IdMarketing: [null, null],
      TipoIndicacao: [null, null],
      IdPacienteIndicacao: [null, null],
      DeclaranteIR: [0, Validators.required],
      IdInstitutoRadiologia: [null, null]
    });
  }

  setFormValue(): void {
    this.form.setValue({
      IdPaciente: this.dataSource.IdPaciente,
      Nome: this.dataSource.Nome,
      CPF: this.dataSource.CPF,
      RG: this.dataSource.RG,
      DataNascimento: new Date(this.dataSource.DataNascimento).toLocaleDateString(CURRENT_LOCALE),
      Sexo: this.dataSource.Sexo,
      EstadoCivil: this.dataSource.EstadoCivil,
      Nacionalidade: this.dataSource.Nacionalidade,
      IdProfissao: this.dataSource.IdProfissao,
      IdLocalizacaoGeografica: this.dataSource.IdLocalizacaoGeografica,
      NumeroEndereco: this.dataSource.NumeroEndereco,
      Complemento: this.dataSource.Complemento,
      IdMarketing: this.dataSource.IdMarketing,
      TipoIndicacao: this.dataSource.TipoIndicacao,
      IdPacienteIndicacao: this.dataSource.IdPacienteIndicacao,
      DeclaranteIR: this.dataSource.DeclaranteIR,
      IdInstitutoRadiologia: this.dataSource.IdInstitutoRadiologia
    });
  }

  onUpdateTelefone(e: any): void {
    this.dataSourceTelefone = e;
  }

  onUpdateEmail(e: any): void {
    this.dataSourceEmail = e;
  }

  onSatisfacaoUpdate(e: any): void {
    this.dataSourceSatisfacao = e;
  }

  clOnBeforeSubmit(): boolean | any {
    this.dataSource = this.form.value;

    if (!this.dataSource.IdLocalizacaoGeografica) {
      this.toast.warning('Informe o endereço para continuar');
      return false;
    }

    if (!this.dataSourceEmail || this.dataSourceEmail.length === 0) {
      this.toast.warning('Informe um e-mail para continuar');
      return false;
    }

    if (!this.dataSourceTelefone || this.dataSourceTelefone.length === 0) {
      this.toast.warning('Informe um telefone para continuar');
      return false;
    }

    if (this.dataSource.DataNascimento.date) {
      this.dataSource.DataNascimento = new Date(this.dataSource.DataNascimento.date.year,
        this.dataSource.DataNascimento.date.month - 1,
        this.dataSource.DataNascimento.date.day);
    }

    this.dataSource.CPF = this.stringLibrary.cleanText(this.dataSource.CPF);

    this.dataSource.Telefones = this.dataSourceTelefone;
    this.dataSource.Emails = this.dataSourceEmail;

    return this.dataSource;
  }

}
