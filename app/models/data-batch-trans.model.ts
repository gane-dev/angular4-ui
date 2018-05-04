import { DataBatchSearch } from './data-batch-search.model'
import { DataBatchTransDetails } from './dbt-details.model'
export interface DataBatchTrans {
    header: DataBatchSearch;
    records: DataBatchTransDetails[];
}