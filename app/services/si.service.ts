import 'rxjs/add/operator/map';
import { Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { SpendIncident } from '../models/spend-incident.model'
import { SpendIncidentHeader } from '../models/spend-incident-header.model'
import { SpendIncidentDetail } from '../models/spend-incident-detail.model'
import {api} from '../../environments/apipath'
@Injectable()
export class SiService {
    private API_PATH: string = api.apiPath+'SpendIncident/';
  
    private SEARCH_SI: string = 'Search';
    private SELECT_SI: string = 'GetDetails';
    private SAVE_HEADER: string = 'SaveHeader';
    private IGNORE_TRANSACTION: string = 'IgnoreSiTransaction';
    constructor( @Inject(Http) protected http: Http) {
    }


  
    searchSi(dataRecord: SpendIncidentHeader): Observable<SpendIncidentHeader[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_SI}`, dataRecord, options)
            .map(res => res.json());
    }
    selectSi(dataRecord: SpendIncidentHeader): Observable<SpendIncidentDetail[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SELECT_SI}`, dataRecord, options)
            .map(res => res.json());
    }
    saveSiHeader(inputValues: SpendIncidentHeader): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SAVE_HEADER}`, inputValues, options)
            .map(res => res.json());
    }
    ignoreSiTransaction(inputValues: SpendIncidentDetail[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.IGNORE_TRANSACTION}`, inputValues, options)
            .map(res => res.json());
    }
}
