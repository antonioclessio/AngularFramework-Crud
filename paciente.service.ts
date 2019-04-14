import { Injectable } from '@angular/core';
import { Endpoint } from '../../app.endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare let $: any;

@Injectable()
export class PacienteService {

    constructor(private serviceHelper: HttpClient) {}

    getAll(): Observable<any> {
        return this.serviceHelper.get(Endpoint.PACIENTE);
    }

    getByKey(idPaciente: number): Observable<any> {
        const url: string = Endpoint.PACIENTE + '/' + idPaciente;
        return this.serviceHelper.get(url);
    }

    getByFilter(data: any): Observable<any> {
        const url: string = Endpoint.PACIENTE + '?' + $.param(data);
        return this.serviceHelper.get(url);
    }

    autoComplete(e: string): Observable<any> {
        const url: string = Endpoint.PACIENTE_AUTOCOMPLETE + '?q=' + e;
        return this.serviceHelper.get(url);
    }

    getPorDoutor(idDoutor: number): Observable<any> {
        return this.serviceHelper.get(Endpoint.PACIENTE_DOUTOR + '/' + idDoutor);
    }

    getSatisfacao(idPaciente: number, idAgenda: number = null): Observable<any> {
        if (idAgenda) {
            return this.serviceHelper.get(Endpoint.SATISFACAO + '?idPaciente=' + idPaciente + '&idAgenda=' + idAgenda);
        }
        return this.serviceHelper.get(Endpoint.SATISFACAO + '?idPaciente=' + idPaciente);
    }

    getResumo(idPaciente: number): Observable<any> {
        return this.serviceHelper.get(Endpoint.PACIENTE + '/' + idPaciente + '/resumo');
    }

    getAniversariantes(): Observable<any> {
        return this.serviceHelper.get(Endpoint.PACIENTE_ANIVERSARIANTES);
    }

    getDesatualizados(): Observable<any> {
        return this.serviceHelper.get(Endpoint.PACIENTE_DESATUALIZADOS);
    }

    getContratos(idPaciente: number): Observable<any> {
        return this.serviceHelper.get(`${Endpoint.PACIENTE}/${idPaciente}/contratos`);
    }

    getProntuario(key: number): Observable<any> {
        return null;
    }

    getVencimentosDia(): Observable<any> {
        return this.serviceHelper.get(`${Endpoint.PACIENTE_FINANCEIRO_VENCIMENTOSDIA}`);
    }

    reativar(idPaciente: number): Observable<any> {
        return this.serviceHelper.post(`${Endpoint.PACIENTE}/${idPaciente}/reativar`, null);
    }

    inativar(idPaciente: number): Observable<any> {
        return this.serviceHelper.post(`${Endpoint.PACIENTE}/${idPaciente}/inativar`, null);
    }
}
