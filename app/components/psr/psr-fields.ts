import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule,Form,NgForm } from '@angular/forms';
import { PsrTable } from '../../models/psr-table.model';
import { PsrExceptionGroup } from '../../models/psr-exception-group.model';
import { LookupDataService } from '../../services/lookup-data.service';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { CustomerLOV } from '../../models/customer-lov.model';
import { SupplierLOV } from '../../models/supplier-lov.model';
import { PsrEditService } from '../../containers/services/psr-edit.service';
@Component({
    selector: 'cia-psr-fields',
    templateUrl: '../html/psr/psr-fields.html',
    changeDetection: ChangeDetectionStrategy.Default
})

export class PsrFieldsComponent {

  //@Input() query: PsrTable;// = Object.assign({}, <PsrTable>{});
  @Input() custId: string;
  @Input() suppId: string;
  @Input() ruleLevel: string;
   @Output() custIdChange = new EventEmitter();
    @Output() suppIdChange = new EventEmitter();
     @Output() ruleLevelChange = new EventEmitter();
       public ruleLevelOptions: Array<{ text: string, value: string }>;

  public custName: CustomerLOV;
  public suppName: SupplierLOV;
  constructor(private lookupDataService: LookupDataService
     , private psrEditService: PsrEditService
  ) {

      this.ruleLevelOptions = lookupDataService.getPsrRLItems();
  }
  hRuleLevel(value)
    {
         // this.query = Object.assign({},this.query,{RULE_LEVEL : value});
         this.ruleLevel = value;
          this.ruleLevelChange.emit(value);
    }
    custChange(value)
    {
        this.custId = value;
          this.custIdChange.emit(value);
    }
    suppChange(value)
    {
        this.suppId = value;
            this.suppIdChange.emit(value);
    }

}
