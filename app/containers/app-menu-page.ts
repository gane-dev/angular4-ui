import { Component, Input, ElementRef, TemplateRef } from '@angular/core';

import {
    PopupService,
    PopupRef
} from '@progress/kendo-angular-popup';

import { SearchLovComponent } from '../components/common/search-lov.component';
import { MenuItem, Menubar } from 'primeng/primeng';
//import { MdProgressSpinnerModule } from '@angular/material';
import { CommonFunctionService } from '../services/common-functions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
@Component({
    selector: 'app-menu',
    templateUrl: 'html/app-menu-page.html',
})
export class AppMenuPageComponent {
    private items: MenuItem[];
    @Input() open = false;
    //public color: string = 'primary';
    //public mode: string = 'indeterminate';
    //public value: number = 50;
    public showProgess$: Observable<boolean>;
    private popupRef: PopupRef;
    constructor(private popupService: PopupService,private store: Store<fromRoot.State>,private commonFunctionService: CommonFunctionService) {
        this.showProgess$ = store.select(fromRoot.getShowProgress);
    }
    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Home',
                        //disabled: this.open,
                         routerLink: ['home']
                    }
                    //,
                    //{
                    //    label: 'Logout',
                    //    routerLink: ['login/1']
                    //}
                ]

            },
             {   label: 'Rules',
                items: [{
                    label: 'PSR Exceptions(Search)',
                    //disabled: this.open,
                    routerLink: ['psr/search']
                },
                    {
                        label: 'PSR Exceptions(Add)',
                      //  disabled: this.open,
                        routerLink: ['psr/1']
                    },
                {
                    label: 'Spend Rule (Search)',
                    //disabled: this.open,
                    routerLink: ['sr/search']
                }
                    ,
                {
                    label: 'Spend Rule (Add)',
                    //disabled: this.open,
                    routerLink: ['sr/1']
                }
                ]
            },
            {
                label: 'Application',
                items: [{
                    label: 'Spend Incident',
                    //disabled: this.open,
                    routerLink: ['si/search']
                },
                {
                    label: 'Opportunity',
                   // disabled: this.open,
                    routerLink: ['opp/search']
                }

                ]
            },
            {
                label: 'Publish',
                //icon: 'fa-edit',
                items: [
                    {
                        label: 'Data Batch',
                     //   disabled: this.open,
                        routerLink: ['db/search']
                    }
                ]
            }
            ,
            {
                label: 'Customer Information Analysis',
                disabled: true,
                icon: 'icon-user',

            },
             {
                 label: this.commonFunctionService.getUserCookie(),
                 disabled:true,
                icon: 'icon-user',
                
            }
            
        ];
    }
  

    waitForLovToLoad(): Observable<boolean> {
        return this.store.select(fromRoot.getLovLoaded)
            .filter(loaded => loaded)
            .take(1);
    }
   

    public togglePopup(anchor: ElementRef) {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        } else {
            //this.waitForLovToLoad().subscribe(x => {
                this.popupRef = this.popupService.open({
                    anchor: anchor,
                    content: SearchLovComponent
                });
            //});
        }
    }
}
