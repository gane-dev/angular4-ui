export interface SpendIncidentDetail {
        SPEND_AUDIT_ID : number;
        SPEND_YEAR : number;
        SPEND_PERIOD : number;
        SOURCE_ID : string;
        CUST_ID : string;
        SUPPLIER_ID : string;
        ITEM_CATEGORY : string;
        TRANSACTION_ID : string;
         TRANSACTION_DATE : Date;
         CP_SPEND : number;
         SP_SPEND : number;
         CP_SPEND_USD : number;
         SP_SPEND_USD : number;
         VARIANCE : number;
         VARIANCE_USD: number;
         PCT_VARIANCE: number;
         PCT_VARIANCE_USD : number;
         RULE_ID: string;
        IGNORE_FLG : string;
        TOLERANCE_PCT: number;
        BATCH_ID: number;
}