export interface DataBatchSearch {
    SOURCE_ID: string;
   // LOAD_YEAR: number;
   // LOAD_PERIOD: number;
    fromDate: Date;
    toDate: Date;
    BATCH_ID: number;
    PUBLISH_STATUS: string;
    PUBLISH_ACTION: string;
    move: number;
    AV_TRANSACTION_ID: number;
    remote: boolean;
    CP_CUST_NAME: string;
    CP_SUPP_NAME: string;
    SORTED_KEY: number;
    }