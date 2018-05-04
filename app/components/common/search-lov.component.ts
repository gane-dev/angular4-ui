import { SupplierLOV } from '../../models/supplier-lov.model';
import { Component, ViewChild, Input, ChangeDetectionStrategy, EventEmitter, Output, OnChanges } from '@angular/core';
import * as fromRoot from '../../reducers';
import { HomePageService } from '../../containers/services/home-page.service'
import * as lookupActions from '../../actions/lookup-actions';
import { LookupDataService } from '../../services/lookup-data.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
@Component({
    selector: 'search-lov',
    templateUrl: '../html/common/search-lov.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLovComponent implements OnChanges {
    @ViewChild("searchValue") searchValue;
    public source: Array<{ text: string, value: string }> = [];

    public data: Array<{ text: string, value: string }>;
    constructor(private lookupService: LookupDataService, private homePageService: HomePageService) {
        this.data = this.source.slice();
    }
    ngOnChanges() {
       
    }
   
    ngAfterViewInit() {
        const contains = value => s => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;

        this.searchValue.filterChange.asObservable().switchMap(value => Observable.from([this.source])
            .do(() => this.searchValue.loading = true)
            .delay(1000)
            .map((data) => data.filter(contains(value))))
            .subscribe(x => {
                this.data = x;
                this.searchValue.loading = false;
            });
    }
    
}
