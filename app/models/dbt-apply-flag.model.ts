export interface DBTApplyFlag {
    SOURCE_ID: string;
    LOAD_YEAR: number;
    LOAD_PERIOD: number;
    BATCH_ID: number;
    CP_TRANS_ID_XREF: string;
    AV_TRANSACTION_ID: number;
    CP_TRANS_DATE: Date;
    CP_CUST_XREF: string;
    CP_SUPP_XREF: string;
    TRANS_TYPE: string;
    PUBLISH_INC_EXC_IND: string;
    LAST_REVIEWED_BY: string;
    LAST_REVIEWED_DATE: Date;
}