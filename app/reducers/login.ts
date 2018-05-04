import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';

import * as login from '../actions/login-actions';

import { LoginModel } from '../models/login.model';

export interface State {
    userModel: LoginModel;
    loginResult: string;
}


const initialState: State = {
    userModel: null,
    loginResult: '-1'

};

export function reducer(state = initialState, action: login.Actions): State {
    switch (action.type) {
        case login.ActionTypes.LOGIN_COMPLETE:
            {
                return Object.assign({}, initialState, { loginResult: action.payload });
            }
        case login.ActionTypes.LOGIN:
            {
                return Object.assign({}, initialState, { loginResult: '-1' });
            }
        default: {
            return state;
        }
    }

}

export const getLoginResult = (state: State) => state.loginResult;




