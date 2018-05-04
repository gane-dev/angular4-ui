export interface DataBatchTransSpend {
    CP_TRANS_ID_XREF: string;
    CP_TRANS_DATE: Date;
    CP_CUST_XREF: string;
    CP_SUPP_XREF: string;
    SPEND: number;
    SPEND_IN_SCOPE: number;
    SPEND_OUT_SCOPE: number;
    SPEND_PERCENT_IN_SCOPE: number;
    SPEND_PERCENT_OUT_SCOPE: number;
    GOOD_SPEND_AMT: number;
    BAD_SPEND_AMT: number;
    GOOD_SPEND_PERCENT: number;
    BAD_SPEND_PERCENT: number;
}