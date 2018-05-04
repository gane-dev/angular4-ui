
import { Component, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { PsrTable } from '../../models/psr-table.model';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PsrSearchService } from '../../containers/services/psr-search.service';
@Component({
    selector: 'cia-psr-search',
    templateUrl: '../html/psr/psr-search.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PsrSearchComponent implements OnChanges {
    @Input() query: PsrTable;// = Object.assign({}, <PsrTable>{});
    public CUST_ID: string;
    public SUPPLIER_ID: string;
    constructor( private psrSearchService: PsrSearchService
    ) {
        
    }
  ngOnChanges()
  {
      this.CUST_ID = this.query.CUST_ID;
      this.SUPPLIER_ID = this.query.SUPPLIER_ID;
  }
    search() {
 
        this.query = Object.assign({}, this.query, { CUST_ID: this.CUST_ID, SUPPLIER_ID: this.SUPPLIER_ID });
        this.psrSearchService.searchPsr(this.query);
    }
    clear() {
        this.psrSearchService.clearSearch();
        this.CUST_ID = null;
        this.SUPPLIER_ID = null;
    }
   
  
}
