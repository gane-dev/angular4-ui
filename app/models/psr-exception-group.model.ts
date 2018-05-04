import {PsrTable} from './psr-table.model'
export interface PsrExceptionGroup {
    SOURCE_ID: string;
    CUST_ID: string;
    SUPPLIER_ID: string;
    RULE_LEVEL: string;
    psrTable: Array<PsrTable>;
}