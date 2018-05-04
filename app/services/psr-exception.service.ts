import 'rxjs/add/operator/map';
import { Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PsrExceptionGroup } from '../models/psr-exception-group.model';
import { PsrTable } from '../models/psr-table.model';
import {api} from '../../environments/apipath'
@Injectable()
export class PsrExceptionRuleService {
    private API_PATH: string = api.apiPath+'PsrRules/';
    private GET: string = 'GetPsrRules'
    private ADD: string = 'Create'
    private DEL: string = 'DeletePsr'
    constructor( @Inject(Http) protected http: Http) {
    }
    
    getPsrRules(inputValues: PsrTable): Observable<PsrTable[]> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET}`, inputValues,options)
            .map(res => res.json());
    }
    
    addPsrRules(inputValues: PsrTable): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.ADD}`, inputValues, options)
            .map(res => res.json());
    }
    deletePsrRules(inputValues: PsrTable): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.DEL}`, inputValues, options)
            .map(res => res.json());
    }
    //createItem(item: Item) {
    //    this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
    //        .map(res => res.json())
    //        .map(payload => ({ type: 'CREATE_ITEM', payload }))
    //        .subscribe(action => this.store.dispatch(action));
    //}

    //updateItem(item: Item) {
    //    this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
    //        .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    //}

    //deleteItem(item: Item) {
    //    this.http.delete(`${BASE_URL}${item.id}`)
    //        .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
    //}
    
}
