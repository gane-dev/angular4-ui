import { DataSourceLOV } from '../../models/datasource-lov.model';
import { Component, ViewChild, Input, ChangeDetectionStrategy, EventEmitter, Output, OnChanges } from '@angular/core';
import * as fromRoot from '../../reducers';
import { HomePageService } from '../../containers/services/home-page.service'
import * as lookupActions from '../../actions/lookup-actions';
@Component({
    selector: 'cia-ds-search',
    templateUrl: '../html/common/ds-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DSSearchComponent implements OnChanges{

    @ViewChild("dsId") dsId;
    @ViewChild("dsName") dsName;
    @Input() sourceId: string;
    @Output() sourceIdChange: EventEmitter<string> = new EventEmitter();
    private sourceName: string;
    private dsData: DataSourceLOV[];
    constructor(private homePageService: HomePageService) {
        
    }
    ngOnChanges() {
        if (this.sourceId === null)
            this.sourceName = null;
    }
    selectDsId(val: any) {
       // if (this.dsData != undefined)
        this.sourceId = val;
        this.sourceIdChange.emit(this.sourceId);
        const tmp = this.dsData.filter(x => x.SOURCE_ID === val).pop();
        if (tmp != undefined)
            this.sourceName = tmp.SOURCE_NAME;

    }
    selectDsName(val: any) {
        const tmp = this.dsData.filter(x => x.SOURCE_NAME === val).pop()
        if (tmp != undefined)
            this.sourceId = tmp.SOURCE_ID;
       
    }
    ngAfterViewInit() {

        this.dsId.filterChange.asObservable().debounceTime(1000).switchMap(value => {
            this.homePageService.getSources(<DataSourceLOV>{ SOURCE_ID: value,SOURCE_NAME :null });
            return this.homePageService.dsList$;
        }).subscribe(x => this.dsData = x);

        this.dsName.filterChange.asObservable().debounceTime(1000).switchMap(value => {
            this.homePageService.getSources(<DataSourceLOV>{ SOURCE_ID: null, SOURCE_NAME: value });
            return this.homePageService.dsList$;
        }).subscribe(x => this.dsData = x);
    }
}