import { Component, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { PsrGridEditComponent} from './psr-grid-edit';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { PsrTable } from '../../models/psr-table.model';
import { PsrExceptionGroup } from '../../models/psr-exception-group.model';
import { PsrEditService } from '../../containers/services/psr-edit.service';
@Component({
    selector: 'cia-psr-grid',
    templateUrl: '../html/psr/psr-grid.html',

})
export class PsrGridComponent implements OnChanges {
    @ViewChild(PsrGridEditComponent) protected editFormComponent: PsrGridEditComponent;
    @Input() psrrule: PsrTable[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    public dataItem: PsrTable;//= <PsrTable>{};
    constructor(private psrEditService: PsrEditService) {
       
    }
   
    ngOnChanges() {
        if (this.sort === null || this.sort === undefined || this.sort.length === 0)
            this.sort = [{ field: 'EFF_DATE', dir: 'desc' }];
        this.loadData();
    }
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadData();
    }
    private loadData(): void {
        
        if (this.psrrule != null) {
            this.gridView = {
                data: orderBy(this.psrrule, this.sort),
                total: this.psrrule.length
            };
        }
    }
    public onEdit(dataItem: PsrTable): void {
        this.dataItem = dataItem;
    }

    public onCancel(): void {
        this.dataItem = undefined;
    }

    public onAdd(): void {
        this.editFormComponent.add();
    }
  /*  public save(psr:PsrTable): void {
        //this.editFormComponent.add();
        this.psrEditService.save(psr);
    }*/
    onDelete(psr: PsrTable): void
    {
        this.psrEditService.deletePsr(psr);
    }
}

