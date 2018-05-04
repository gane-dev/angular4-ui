import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs/observable/of';
import * as login from '../actions/login-actions';


@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginService: LoginService,
    ) { }
    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(login.ActionTypes.LOGIN)
        .map((action: login.LoginAction) => action.payload)
        .filter(query => query !== null)
        .switchMap(query => this.loginService.LoginUser(query)
            .map((result: string) => new login.LoginCompleteAction(result))
            .catch(() => of(new login.LoginCompleteAction(null)))
    );
}
