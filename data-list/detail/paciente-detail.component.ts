import { Component } from '@angular/core';
import { IDetailComponent } from '@clessit/ngx-appbuilder';

declare let $: any;

@Component({
    templateUrl: './paciente-detail.component.html'
})
export class PacienteDetailComponent implements IDetailComponent {

    dataSource: any = {};
}
