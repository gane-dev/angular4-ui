import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FilterType } from '../../models/filter-type.model';

@Component({
    selector: 'cia-single-filter',
    templateUrl: '../html/common/single-filter.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SingleFilterComponent {

    @Input() filterItem: FilterType;
    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();
    constructor() {
    }
    addFilter(val: string) {
        this.add.emit({ name: this.filterItem.name, value: val });
    }
    removeFilter() {
        this.remove.emit(this.filterItem);
    }
}