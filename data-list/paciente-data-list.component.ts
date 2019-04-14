import { Component } from '@angular/core';
import { ButtonBarGroup, ButtonItem, ButtonTypeEnum, IDataListComponent } from '@clessit/ngx-appbuilder';

import { AplicacaoEnum } from '../../../common/enum/aplicacao.enum';
import { Endpoint } from '../../../app.endpoint';

@Component({
    selector: 'paciente-data-list',
    templateUrl: './paciente-data-list.component.html',
    styleUrls: ['./paciente-data-list.component.scss']
})
export class PacienteDataListComponent implements IDataListComponent {

    ApplicationID = AplicacaoEnum.Paciente;

    title: string = 'Clientes';
    prefix: string = 'Paciente';

    buttonBar: ButtonBarGroup[] = [];
    selectedKey: number;
    apiAction: string = Endpoint.PACIENTE;

    constructor () {}

    buttonBar_Click(e: ButtonItem): void {
        if (e.type !== ButtonTypeEnum.Default) { return; }
    }
}
