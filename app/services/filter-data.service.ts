import { Injectable, Inject} from '@angular/core';
@Injectable()
export class FilterDataService {
getDbtFilters(): Array<{ name: string, value: string }> {
        return [
            

            { name: "CP_CUST_NAME", value: "" },
             { name: "CP_SUPP_NAME", value: "" },
             { name: "CP_TRANS_ID_XREF", value: "" },
             
        ];
    }
    getDbFilters(): Array<{ name: string, value: string }> {
        return [
            

            { name: "CUST_ID", value: "" },
             { name: "SUPPLIER_ID", value: "" },
             { name: "FILE_ID", value: "" },
             
        ];
    }
}
