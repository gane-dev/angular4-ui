import 'rxjs/add/operator/map';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataBatchTrans } from '../models/data-batch-trans.model';
import { DataBatchTransDetails } from '../models/dbt-details.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { api } from '../../environments/apipath';
import { DBTApplyFlag } from '../models/dbt-apply-flag.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
@Injectable()
export class DataBatchTransService {
    private API_PATH: string = api.apiPath + 'DataBatchTrans/';

    private SEARCH_DATA_BATCH_TRANS: string = 'Search';
    private GET_TRANS: string = 'GetTransactions';
    private SAVE_DBT: string = 'Save';
    private APPLY_FLAG: string = 'ApplyFlag';
    private GET_TRANS_COUNT: string = 'GetTransactionsCount';
    constructor( @Inject(Http) protected http: Http, private store: Store<fromRoot.State>) {
    }
    searchDataBatchTrans(dataRecord: DataBatchSearch): Observable<DataBatchTrans[]> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_DATA_BATCH_TRANS}`, dataRecord, options)
            .map(res => res.json());
    }
    getDataBatchTrans(dataRecord: DataBatchSearch): Observable<DataBatchTransDetails[]> {
      
                let body = JSON.stringify({ dataRecord });
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                return this.http.post(`${this.API_PATH}${this.GET_TRANS}`, dataRecord, options)
                    .map(res => res.json());
      
    }
    getDataBatchTransCount(dataRecord: DataBatchSearch): Observable<number> {

        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.GET_TRANS_COUNT}`, dataRecord, options)
            .map(res => res.json());

    }
    saveDbt(inputValues: DataBatchTransDetails[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SAVE_DBT}`, inputValues, options)
            .map(res => res.json());
    }
    applyFlags(inputValues: DBTApplyFlag[]): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.APPLY_FLAG}`, inputValues, options)
            .map(res => res.json());
    }
}
