import 'rxjs/add/operator/map';
import { Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Opportunity } from '../models/opportunity.model';
import { OpportunityHeader } from '../models/opportunity-header.model';
import { OpportunityDetail } from '../models/opportunity-detail.model';
import { OpportunitySearch } from '../models/opportunity-search.model';
import {api} from '../../environments/apipath'
@Injectable()
export class OpportunityService {
    private API_PATH: string = api.apiPath+'Opportunity/';
  
    private SEARCH_OPPORTUNITY: string = 'Search';
    private SAVE_HEADER: string = 'SaveOppHeader';
    private GET_DETAILS: string = 'GetOppDetails';
    constructor( @Inject(Http) protected http: Http) {
    }


  
    searchOpportunity(dataRecord: OpportunitySearch): Observable<OpportunityHeader[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_OPPORTUNITY}`, dataRecord, options)
            .map(res => res.json());
    }
    saveOppHeader(inputValues: OpportunityHeader): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SAVE_HEADER}`, inputValues, options)
            .map(res => res.json());
    }
    selectOpportunity(dataRecord: OpportunityHeader): Observable<OpportunityDetail[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_DETAILS}`, dataRecord, options)
            .map(res => res.json());
    }
}
