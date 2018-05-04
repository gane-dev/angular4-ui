export interface OpportunityHeader { 
        CUST_ID : string;
        SUPPLIER_ID : string;
        SYS_PROPOSED_SUPP_ID : string;
        USER_PROPOSED_SUPP_ID : string;
        SPEND_USD : number;
        COMMENTS : string;
        CREATED_BY : string;
        UPDATED_BY : string;
        DATE_CREATED : Date;
        DATE_LAST_UPDATED : Date;
        ACTION_CODE : string;
        PRIORITY : string;
        STATUS : string;
        PROCESS_ID: number;
        BATCH_ID: number;
}