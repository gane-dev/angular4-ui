import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Injectable, Inject } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as loginActions from '../../actions/login-actions';
import * as layout from '../../actions/layout';
@Injectable()
export class LoginPageService {
    public loginResult$: Observable<string>;
    constructor(private store: Store<fromRoot.State>, private router: Router) {
        this.loginResult$ = store.select(fromRoot.getLoginResult).filter(loaded => loaded !== '-1').take(1);
    }
    login(model: LoginModel) {
        this.store.dispatch(new loginActions.LoginAction(model));
        this.loginResult$.subscribe(
            (result: string) => {
            
                    if (result == '1')
                    {
                        this.store.dispatch(new layout.OpenSidenavAction());
                        this.router.navigate(['home']);
                    }
                    else
                    {
                         this.store.dispatch(new layout.CloseSidenavAction());
                        alert("Login Error:" + result)
                    }
            });
    }
    logout()
    {
        this.store.dispatch(new layout.CloseSidenavAction());
     //   this.router.navigate(['']);
    }
}
