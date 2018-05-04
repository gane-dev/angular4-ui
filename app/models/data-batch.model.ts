import { DataBatchDetails} from './data-batch-details.model'
export interface DataBatch {
    SOURCE_ID: string;
    records: DataBatchDetails[];
  }