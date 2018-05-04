import { CategoryLOV } from '../../models/category-lov.model';
import { Component, ViewChild, Input, ChangeDetectionStrategy, EventEmitter, Output, OnChanges } from '@angular/core';
import * as fromRoot from '../../reducers';
import { HomePageService } from '../../containers/services/home-page.service'
import * as lookupActions from '../../actions/lookup-actions';
@Component({
    selector: 'cia-category-search',
    templateUrl: '../html/common/cat-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySearchComponent implements OnChanges{

    @ViewChild("catList") catList;
    @ViewChild("catDescList") catDescList;
    @Input() catId: string;
    @Output() catIdChange: EventEmitter<string> = new EventEmitter();
    private catDesc: string;
    private catData: CategoryLOV[]=[];
    constructor(private homePageService: HomePageService) {
        
    }
    ngOnChanges() {
        if (this.catId === null)
            this.catDesc = null;
    }

    selectCatId(val: any) {
       // if (this.catData != undefined)
        this.catId = val;
        this.catIdChange.emit(this.catId);
        const tmp = this.catData.filter(x => x.CATEGORY === val).pop();
        if (tmp != undefined)
            this.catDesc = tmp.LONG_DESCRIPTION;

    }
    selectCatDesc(val: any) {
        const tmp = this.catData.filter(x => x.LONG_DESCRIPTION === val).pop()
        if (tmp != undefined)
            this.catId = tmp.CATEGORY;
       
    }
    ngAfterViewInit() {

        this.catList.filterChange.asObservable().debounceTime(1000).switchMap(value => {
            this.homePageService.getCategory(<CategoryLOV>{ CATEGORY: value,LONG_DESCRIPTION :null });
            return this.homePageService.catList$;
        }).subscribe(x => this.catData = x);

        this.catDescList.filterChange.asObservable().debounceTime(1000).switchMap(value => {
            this.homePageService.getCategory(<CategoryLOV>{ CATEGORY: null, LONG_DESCRIPTION: value });
            return this.homePageService.catList$;
        }).subscribe(x => this.catData = x);
    }
}