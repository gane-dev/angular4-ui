import 'rxjs/add/operator/map';
import { Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoginModel } from '../models/login.model';
import {api} from '../../environments/apipath';

@Injectable()
export class LoginService {
    private API_PATH: string = api.apiPath+'Login/';
    private LOGIN_USER: string = 'LoginUser';
   
    constructor( @Inject(Http) protected http: Http) {
       
    }
    LoginUser(dataRecord: LoginModel): Observable<string> {
        let body = JSON.stringify({ dataRecord });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.API_PATH}${this.LOGIN_USER}`, dataRecord, options)
            .map(res => res.json());
    }

}
