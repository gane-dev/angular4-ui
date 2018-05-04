import { Component, ChangeDetectionStrategy, OnChanges, OnInit, ViewChild, ElementRef, ViewContainerRef, ChangeDetectorRef  } from '@angular/core';


import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/observable/fromEvent';
import 'rxjs/observable/merge';
import 'rxjs/add/operator/do';
import { DbtEditService } from './services/dbt-edit.service';
import { DataBatchTrans } from '../models/data-batch-trans.model';
import { DataBatchTransDetails } from '../models/dbt-details.model';

import { DataBatchSearch } from '../models/data-batch-search.model';
import { Router } from '@angular/router';
import { ActivatedRoute , ParamMap} from '@angular/router';
import * as filterFunctions from '../reducers/filter-function';
import { FilterType } from '../models/filter-type.model';
import { DBTApplyFlag } from '../models/dbt-apply-flag.model';
import { GridDataResult, GridComponent, DataStateChangeEvent, SelectableSettings  } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { ErrorLevel,MessageService } from '../services/message.service';
import { ConfirmDialogComponent } from '../components/common/confirm-dialog.component';
import { MsgBoxComponent } from '../components/common/msg-box.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../environments/environment';
@Component({
    //   moduleId: module.id,
    selector: 'cia-dbt-edit',
    templateUrl: 'html/dbt-edit-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DbtEditService]
})
export class DbtEditPageComponent implements OnInit {

    private state: State = {
        skip: 0,
        take: 15
    };
    private selectableSettings: SelectableSettings = {
        checkboxOnly: true,
        mode: "multiple"
        };

    private mySelection: number[]= [];
    dataTransactions: DataBatchTransDetails[] = [];
    private gridData: GridDataResult;
    recordCount: number;
    batchId: string;
    sourceId: string;
    showNext: boolean;
    currentSet: Observable<number>;
    totalSet: number;
    private latestRecord: number;
    private cpSuppName: string;
    private cpCustName: string;
    private firstAttempt: boolean = true;
    private ascending: boolean = false;
    private batchSize: number = environment.batchSize;
    constructor(private router: Router, private route: ActivatedRoute,
        private dbtEditService: DbtEditService, private msgService: MessageService
        , public toastr: ToastsManager, vcr: ViewContainerRef, private cd: ChangeDetectorRef
    ) {
        this.latestRecord = -1;
        this.toastr.setRootViewContainerRef(vcr);
        this.currentSet = this.dbtEditService.getCurrentSet();
    }
    public ngOnInit(): void {

        this.route.params.subscribe(
            params => {
                params['id'] === "0"
                this.recordCount = +params['count'];
                this.batchId = params['batchId'];
                this.sourceId = params['sourceId'];
                
            });
        this.dbtEditService.dbtCount$.subscribe((data: number) => {
            this.recordCount = data;
            if (this.recordCount > environment.batchSize) {
                this.showNext = true;
                this.totalSet = Math.ceil(this.recordCount / environment.batchSize);
            }
            else
            { this.showNext = false; }
        });
            this.dbtEditService.dbt$.subscribe((data: DataBatchTransDetails[]) => {
                this.dataTransactions = Object.assign([], data);
              
                 this.load();
            });
        
      }
    load() {
        this.gridData = process(this.dataTransactions, this.state);
        this.mySelection = this.dataTransactions.map((rec: DataBatchTransDetails) => { if (rec.PUBLISH_INC_EXC_IND === 'E') return rec.AV_TRANSACTION_ID; });
        this.cd.detectChanges();
    }
    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.load();
    }
    getPrev() {
        this.dbtEditService.getNextTransactions(this.sourceId, this.batchId, -1, null, false,this.ascending);
        

    }
    getNext() {
        var remote: boolean = false;
        if (this.latestRecord < this.dataTransactions[this.dataTransactions.length - 1].SORTED_KEY) {
            this.latestRecord = this.dataTransactions[this.dataTransactions.length - 1].SORTED_KEY;
            remote = true;
        }
        else
            remote = false;

        console.log(remote);
        this.dbtEditService.getNextTransactions(this.sourceId, this.batchId, 1, this.dataTransactions[this.dataTransactions.length - 1].SORTED_KEY, remote, this.ascending);
        
    }
    backToSearch() {
        this.dbtEditService.clearSearch();
        this.dbtEditService.goBack();
    }
    
    search() {

        this.dbtEditService.getTransactions(this.sourceId, this.batchId, this.cpCustName, this.cpSuppName,this.firstAttempt,this.ascending);
        this.firstAttempt = false;
    }
    clear() {
        this.gridData = null;//process(this.dataTransactions, this.state);
        this.cpCustName = null;
        this.cpSuppName = null;
        this.cd.detectChanges();
    }
    applyFlag() {
      //  if (confirm('Do you want save changes to database?')) {
        this.dbtEditService.applyFlags(Object.assign([], this.dataTransactions.map((rec: DataBatchTransDetails) => { if (this.mySelection.indexOf(rec.AV_TRANSACTION_ID) > -1) return Object.assign({}, this.getFlags(rec)); })));
            this.dbtEditService.waitForApply().subscribe(
                (result: string) => {
                    if (result == '1')
                    {
                        console.log(result);
                        // alert("Include / Exclude Save Completed")
                        this.toastr.success('Include / Exclude Save Completed', 'Success!');
                    }
                    else if (result == null)
                        this.toastr.error('Include / Exclude Save Failed!', 'Error!');
                    else 
                        this.toastr.error('Include / Exclude Save Failed!' + result, 'Error!');
                        //alert("Include / Exclude:" + result)
                });
        //}


    }
    excludeAll(val: boolean) {

        this.dataTransactions = Object.assign([], this.dataTransactions.map((rec: DataBatchTransDetails) => { return Object.assign({}, rec, { PUBLISH_INC_EXC_IND: val ? "E" : "I", Exclude: val }) }));
        //this.load();
        const flags: DBTApplyFlag[] = Object.assign([], this.dataTransactions.map((rec: DataBatchTransDetails) => { return Object.assign({}, this.getFlagObject(rec)); }));
        this.dbtEditService.selectFlags(flags);
    }
    excludeTransaction(dataItem: DataBatchTransDetails) {
        const temp: DataBatchTransDetails = Object.assign({}, dataItem, { PUBLISH_INC_EXC_IND: dataItem.PUBLISH_INC_EXC_IND === "E" ? "I" : "E", Exclude: dataItem.PUBLISH_INC_EXC_IND === "E"? false:true });
        const flag: DBTApplyFlag = Object.assign({}, this.getFlagObject(temp));
        this.dbtEditService.selectFlag(flag);
    }
    getFlagObject(rec: DataBatchTransDetails) {
        return <DBTApplyFlag>{
            SOURCE_ID: rec.SOURCE_ID,
            LOAD_YEAR: rec.LOAD_YEAR,
            LOAD_PERIOD: rec.LOAD_PERIOD,
            BATCH_ID: rec.BATCH_ID,
            CP_TRANS_ID_XREF: rec.CP_TRANS_ID_XREF,
            CP_CUST_XREF: rec.CP_CUST_XREF,
            CP_SUPP_XREF: rec.CP_SUPP_XREF,
            TRANS_TYPE: rec.TRANS_TYPE,
            PUBLISH_INC_EXC_IND: rec.PUBLISH_INC_EXC_IND,
            LAST_REVIEWED_BY: rec.LAST_REVIEWED_BY,
            LAST_REVIEWED_DATE: rec.LAST_REVIEWED_DATE,
            AV_TRANSACTION_ID : rec.AV_TRANSACTION_ID

        };
    }
    getFlags(rec: DataBatchTransDetails) {
        return <DBTApplyFlag>{
            BATCH_ID: rec.BATCH_ID,
            AV_TRANSACTION_ID: rec.AV_TRANSACTION_ID

        };
    }
}