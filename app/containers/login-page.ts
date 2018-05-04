import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { LoginPageService } from './services/login-page.service';
import { LoginModel } from '../models/login.model';
import { ActivatedRoute } from '@angular/router';
@Component({
    //   moduleId: module.id,
    selector: 'cia-login-page',
    templateUrl: 'html/login-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LoginPageService]

})
export class LoginPageComponent {
  //  private loginModel: LoginModel = <LoginModel>{};
    private userName: string;
    private password: string;
    private savePwd: boolean = true;
    constructor(private route: ActivatedRoute,
private loginPageService: LoginPageService) {
    
    }
    login() {
        if (this.savePwd) {
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('pwd', this.password);
        }
        this.loginPageService.login({ USER_NAME: this.userName, PASSWORD: this.password });
    }
    ngOnInit() {
        
       this.route.params.subscribe(
            params => {
                if (params['id'] === '1') {
                    localStorage.removeItem('userName');
                    localStorage.removeItem('pwd');
                    this.loginPageService.logout();
                    
                }
                else
                {
                    const userName: string = localStorage.getItem('userName');
                    const pwd: string = localStorage.getItem('pwd');
                    if (userName !== null && userName !== undefined && pwd !== null && pwd !== undefined) {
                       this.loginPageService.login({ USER_NAME: userName, PASSWORD: pwd });
                    }
                }
            });
    }
    /*logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
 
        this._router.navigate(['Login']);
    }*/
}