import { FilterType } from '../models/filter-type.model';
import { FilterCond } from '../models/filter-type.model';
import { filterBy } from '@progress/kendo-data-query';
export function applyDbtFilter(data: any, filters: FilterType[]): any {
    if (filters != null && filters !== undefined) {
        const newfilters = filters.map( (rule: FilterType) => {
                return { field: rule.name, operator: 'contains', value: rule.value, ignoreCase: true};
        });
    const nonEmpty = newfilters.filter(rule => {return rule.value !== ''});
        if (nonEmpty !== undefined) {
            const result = filterBy(data, {
                logic: 'and',
                filters: nonEmpty
            });
            return result;
        }

    }
    return data;

}

