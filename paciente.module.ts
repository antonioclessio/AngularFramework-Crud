import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TabThemeModule, ComponentsModule, PipesModule } from '@clessit/ngx-appbuilder';

import { AppCommonModule } from '../../common/app-common.module';
import { PacienteListComponent } from './data-list/list/paciente-list.component';
import { PacienteDataListComponent } from './data-list/paciente-data-list.component';
import { PacienteFormComponent } from './data-form/form/paciente-form.component';
import { PacienteDataFormComponent } from './data-form/paciente-data-form.component';
import { PacienteFilterComponent } from './data-list/filter/paciente-filter.component';
import { PacienteService } from './paciente.service';
import { PacienteDetailComponent } from './data-list/detail/paciente-detail.component';
import { PacienteDadosBasicosComponent } from './data-form/form/paciente-dados-basicos/paciente-dados-basicos.component';
import { PacienteResumoComponent } from './data-form/form/paciente-resumo/paciente-resumo.component';
import { PacienteProntuarioComponent } from './data-form/form/paciente-prontuario/paciente-prontuario.component';
import { PacienteFinanceiroComponent } from './data-form/form/paciente-financeiro/paciente-financeiro.component';
import { PacienteSatisfacaoComponent } from './data-form/form/paciente-satisfacao/paciente-satisfacao.component';

@NgModule({
  imports: [
    CommonModule,
    TabThemeModule,
    ComponentsModule,
    ReactiveFormsModule,
    AppCommonModule,
    PipesModule
  ],
  declarations: [
    PacienteListComponent,
    PacienteDataListComponent,
    PacienteFormComponent,
    PacienteDataFormComponent,
    PacienteFilterComponent,
    PacienteDetailComponent,
    PacienteDadosBasicosComponent,
    PacienteResumoComponent,
    PacienteProntuarioComponent,
    PacienteFinanceiroComponent,
    PacienteSatisfacaoComponent
  ],
  entryComponents: [
    PacienteListComponent,
    PacienteDataListComponent,
    PacienteFormComponent,
    PacienteDataFormComponent,
    PacienteFilterComponent,
    PacienteDetailComponent
  ],
  providers: [ PacienteService ]
})
export class PacienteModule { }
