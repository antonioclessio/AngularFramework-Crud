import { Component, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { ButtonBarGroup, ButtonItem, IDataFormComponent, ModalService, ModalSizeEnum } from '@clessit/ngx-appbuilder';
import { Endpoint } from '../../../app.endpoint';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from '../paciente.service';
import { HelperService } from 'src/app/common/helper.service';
import { AplicacaoEnum } from 'src/app/common/enum/aplicacao.enum';

@Component({
  selector: 'paciente-data-form',
  templateUrl: './paciente-data-form.component.html',
  styleUrls: ['./paciente-data-form.component.scss'],
  providers: [HelperService]
})
export class PacienteDataFormComponent implements IDataFormComponent {

  ApplicationID: number = AplicacaoEnum.Paciente;

  title: string = 'Clientes';
  prefix: string = 'Paciente';
  apiAction: string = null;
  selectedKey: number;
  buttonBar: ButtonBarGroup[] = [];
  useCloseButton: boolean;

  onCloseData: EventEmitter<any> = new EventEmitter<any>();

  TAG_BTN_INATIVAR: number = 1;
  TAG_BTN_REATIVAR: number = 2;

  PERMISSAO_INATIVAR: number = 14;
  PERMISSAO_REATIVAR: number = 15;

  constructor(
    private toast: ToastrService,
    private modal: ModalService,
    private pacienteService: PacienteService,
    private helper: HelperService
  ) {
    this.apiAction = Endpoint.PACIENTE;
  }

  onFormLoaded(): void {
    if (!this.selectedKey || this.selectedKey === 0) { return; }
    this.configButtonBar();
  }

  configButtonBar(): void {

    const customActions: ButtonBarGroup = new ButtonBarGroup([]);

    if (this.helper.checkPermission(this.ApplicationID, this.PERMISSAO_INATIVAR)) {
      const btnInativar: ButtonItem = new ButtonItem();
      btnInativar.icon = 'fa-ban';
      btnInativar.tag = this.TAG_BTN_INATIVAR;
      btnInativar.tooltip = 'Inativar Cliente';
      btnInativar.label = 'Inativar';
      customActions.itens.push(btnInativar);
    }

    if (this.helper.checkPermission(this.ApplicationID, this.PERMISSAO_REATIVAR)) {
      const btnReativar: ButtonItem = new ButtonItem();
      btnReativar.icon = 'fa-check';
      btnReativar.tag = this.TAG_BTN_REATIVAR;
      btnReativar.tooltip = 'Reativar Cliente';
      btnReativar.label = 'Reativar';
      customActions.itens.push(btnReativar);
    }

    this.buttonBar.push(customActions);

  }

  buttonBar_Click(e: ButtonItem): void {
    switch(e.tag) {
      case this.TAG_BTN_REATIVAR: this.btnReativar(); break;
      case this.TAG_BTN_INATIVAR: this.btnInativar(); break;
    }
  }

  btnReativar(): void {
    this.modal.title = 'Reativar paciente';
    this.modal.message = `Reativar o paciente?`;
    this.modal.cancelButtonLabel = 'Não';
    this.modal.confirmButtonLabel = 'Sim';
    this.modal.modalSize = ModalSizeEnum.Small;
    this.modal.actionSubscription = this.modal.buttonClick.subscribe((response: ButtonItem) => {
      if (response.tag === this.modal.TAG_BUTTON_CONFIRM) {
        this.pacienteService.reativar(this.selectedKey).subscribe(response => {
          this.toast.success('Paciente reativado com sucesso');
        });
      }
    });

    this.modal.show();
  }

  btnInativar(): void {
    this.modal.title = 'Inativar paciente';
    this.modal.message = `Inativar o paciente?`;
    this.modal.cancelButtonLabel = 'Não';
    this.modal.confirmButtonLabel = 'Sim';
    this.modal.modalSize = ModalSizeEnum.Small;
    this.modal.actionSubscription = this.modal.buttonClick.subscribe((response: ButtonItem) => {
      if (response.tag === this.modal.TAG_BUTTON_CONFIRM) {
        this.pacienteService.inativar(this.selectedKey).subscribe(response => {
          this.toast.success('Paciente inativado com sucesso');
        });
      }
    });

    this.modal.show();
  }

  closeData(): void {
    this.onCloseData.emit();
  }

}
