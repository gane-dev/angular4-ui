import 'rxjs/add/operator/map';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SpendRule } from '../models/spend-rule.model'
import { SpendRuleSearch } from '../models/spend-rule-search.model'

import { SpendRuleDtl } from '../models/spend-rule-dtl.model';
import { SpendRuleFields } from '../models/spend-rule-fields.model';
import { SpendRuleCat } from '../models/spend-rule-cat.model';
import { SpendRuleSupp } from '../models/spend-rule-supp.model';
import { SpendRuleCust } from '../models/spend-rule-cust.model';
import { SpendRuleDtlSelect } from '../models/sr-details-select.model';

import {api} from '../../environments/apipath'
import { SpendRuleDetails } from '../models/spend-rule-details.model';

@Injectable()
export class SpendRuleService {
    private API_PATH: string = api.apiPath+'SpendRule/';
    private ADD_RULE: string = 'CreateRule'
    private DEL_RULE: string = 'DeleteRule'
 private GET_RULE_ID: string = 'GetNextRuleId'
    private ADD_DETAILS: string = 'CreateDetails'
    private DEL_DETAILS: string = 'DeleteDetails'

    private ADD_CUST: string = 'CreateCust'
    private DEL_CUST: string = 'DeleteCust'

    private ADD_SUPP: string = 'CreateSupp'
    private DEL_SUPP: string = 'DeleteSupp'

    private ADD_CAT: string = 'CreateCat'
    private DEL_CAT: string = 'DeleteCat'

    private SEARCH_SPEND_RULE: string = 'SearchSR';
    private SEARCH_SPEND_DETAIL: string = 'SearchSpendDetail';
    constructor( @Inject(Http) protected http: Http) {
    }
   
    searchSpendRule(dataRecord: SpendRuleSearch): Observable<SpendRuleDtl[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_SPEND_RULE}`, dataRecord, options)
            .map(res => res.json());
    }
    searchSpendDetail(dataRecord: string): Observable<SpendRuleDetails> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_SPEND_DETAIL}`, dataRecord, options)
            .map(res => res.json());
    }
    addSrRule(): Observable<String> {
        //let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.API_PATH}${this.GET_RULE_ID}`)
            .map(res => res.json());
    }
    saveSrRule(inputValues: SpendRuleFields): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD_RULE}`, inputValues, options)
            .map(res => res.json());
    }
    deleteSrRule(inputValues: SpendRuleFields): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL_RULE}`, inputValues, options)
            .map(res => res.json());
    }

    saveSrDetails(inputValues: SpendRuleDtl): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD_DETAILS}`, inputValues, options)
            .map(res => res.json());
    }
    deleteSrDetails(inputValues: SpendRuleDtl): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL_DETAILS}`, inputValues, options)
            .map(res => res.json());
    }

    saveSrCust(inputValues: SpendRuleCust[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD_CUST}`, inputValues, options)
            .map(res => res.json());
    }
    deleteSrCust(inputValues: SpendRuleCust[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL_CUST}`, inputValues, options)
            .map(res => res.json());
    }

    saveSrSupp(inputValues: SpendRuleSupp[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD_SUPP}`, inputValues, options)
            .map(res => res.json());
    }
    deleteSrSupp(inputValues: SpendRuleSupp[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL_SUPP}`, inputValues, options)
            .map(res => res.json());
    }

    saveSrCat(inputValues: SpendRuleCat[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD_CAT}`, inputValues, options)
            .map(res => res.json());
    }
    deleteSrCat(inputValues: SpendRuleCat[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL_CAT}`, inputValues, options)
            .map(res => res.json());
    }
}
