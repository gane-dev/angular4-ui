import 'rxjs/add/operator/map';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataBatch } from '../models/data-batch.model';
import { DataBatchDetails } from '../models/data-batch-details.model';
import { DataBatchSearch } from '../models/data-batch-search.model';
import { api } from '../../environments/apipath'
@Injectable()
export class DataBatchService {
    private API_PATH: string = api.apiPath + 'DataBatch/';

    private SEARCH_DATA_BATCH: string = 'Search';
    private SAVE_DATA_BATCH: string = 'SaveDataBatch';
    private PB_DATA_BATCH: string = 'PublishDataBatch';
    constructor( @Inject(Http) protected http: Http) {
    }

    searchDataBatchs(dataRecord: DataBatchSearch): Observable<DataBatchDetails[]> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SEARCH_DATA_BATCH}`, dataRecord, options)
            .map(res => res.json());
    }
    saveDb(inputValues: DataBatchDetails): Observable<String> {
        let body = JSON.stringify({ inputValues });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.SAVE_DATA_BATCH}`, inputValues, options)
            .map(res => res.json());
    }
    publishDB(dataRecord: DataBatchSearch): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.PB_DATA_BATCH}`, dataRecord, options)
            .map(res => res.json());
    }

}
