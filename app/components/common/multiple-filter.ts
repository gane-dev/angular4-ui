import { Component, Input, ChangeDetectionStrategy,EventEmitter,Output} from '@angular/core';
import { FilterType } from '../../models/filter-type.model';

@Component({
    selector: 'cia-multiple-filter',
    templateUrl: '../html/common/multiple-filter.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultipleFilterComponent  {
 
    @Input() filterItems: FilterType[];
   @Output() add: EventEmitter<any> = new EventEmitter();
   @Output() remove: EventEmitter<any> = new EventEmitter();
    constructor() {
    }
    addFilter(item:FilterType)
    {
        this.add.emit(item);
    }
    removeFilter(item:FilterType)
    {
        this.remove.emit(item);
    }
}