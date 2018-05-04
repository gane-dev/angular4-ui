export interface FilterType {
    name: string;
    value: string;
}
export interface FilterCond {
     field: string;
     operator: string;
     value: string;
      ignoreCase: boolean;
}