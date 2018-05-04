import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Injectable()
export class CommonFunctionService {
    constructor(private _cookieService: CookieService, private router: Router) { }
    getFormatedDate(input: any): string {
        if (input != undefined && input != null)
            if (typeof input !== 'string') 
                return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();
            else
                return input;
    }
    getOppKey(custId: string, suppId: string) {
    return custId + '-' + suppId;
    }
    getUserCookie()
    {
        var usr = this._cookieService.get('CIAUserName');
        if (usr != null && usr != undefined)
            return usr;
        else
            this.router.navigate(['error']);

    }
    getPermissionCookie() {
        var usr = this._cookieService.get('CIALevel');
        if (usr != null && usr != undefined)
            return usr;
        else
            this.router.navigate(['error']);
      
    }
}