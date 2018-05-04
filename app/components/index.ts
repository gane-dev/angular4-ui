import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MaterialModule } from '@angular/material';

import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PsrListComponent } from './psr/psr-list';
//import { PsrAddComponent } from './psr/psr-add';
import { PsrSearchComponent } from './psr/psr-search';
import { PsrFieldsComponent } from './psr/psr-fields';
import { PsrGridComponent } from './psr/psr-grid';
import { PsrGridEditComponent } from './psr/psr-grid-edit';

import { OppListComponent } from './opp/opportunity-search-grid';
import { OpportunitySearchComponent } from './opp/opportunity-search-fields';
import { OppDetailsComponent } from './opp/opportunity-details';
import { OppHeaderComponent } from './opp/opportunity-header';

import { SiListComponent } from './si/si-search-grid';
import { SiSearchFieldsComponent } from './si/si-search-fields';
import { SiDetailsEditComponent } from './si/si-details-edit';
import { SiDetailsComponent } from './si/si-details-grid';
import { SiHeaderComponent } from './si/si-header';


import { SrListComponent } from './sr/sr-search-grid';
import { SrSearchFieldsComponent } from './sr/sr-search-fields';

import { SrCategoryComponent } from './sr/sr-category';
import { SrCustomerComponent } from './sr/sr-customer';
import { SrEditComponent } from './sr/sr-edit';
import { SrSupplierComponent } from './sr/sr-supplier';




import { DbListComponent } from './db/db-search-grid';
import { DbSearchFieldsComponent } from './db/db-search-fields';
import { DbDetailsComponent } from './db/db-details';

import { DbtListComponent } from './dbt/dbt-search-grid';
import { DbtSearchFieldsComponent } from './dbt/dbt-search-fields';
import {DbtDetailsComponent } from './dbt/dbt-details';
import { DbtTransactionComponent } from './dbt/dbt-transactions';
import { DbtQaComponent } from './dbt/dbt-qa';

import { DbtHeaderComponent } from './dbt/dbt-header';

import { DbtMatchingComponent } from './dbt/dbt-matching';
import { DbtSpendComponent } from './dbt/dbt-spend';

import { SingleFilterComponent } from './common/single-filter';
import { MultipleFilterComponent } from './common/multiple-filter';

import { CustomerSearchComponent } from './common/customer-search.component';
import { SupplierSearchComponent } from './common/supplier-search.component';
import { CategorySearchComponent } from './common/cat-search.component';
import { DSSearchComponent } from './common/ds-search.component';
import { ConfirmDialogComponent } from './common/confirm-dialog.component';
import { MsgBoxComponent } from './common/msg-box.component';

import { PipesModule } from '../pipes';
//import 'hammerjs';
//import { AutoCompleteModule } from 'primeng/primeng';
export const COMPONENTS = [
    DSSearchComponent,
    CategorySearchComponent,
    CustomerSearchComponent,
    SupplierSearchComponent,
    PsrListComponent,
  //  PsrAddComponent,
    PsrSearchComponent,
    OppListComponent,
    OpportunitySearchComponent,
    PsrFieldsComponent,
    PsrGridComponent,
    PsrGridEditComponent,
    SiListComponent,
    SrListComponent,
    DbListComponent,
    SiSearchFieldsComponent,
    SrSearchFieldsComponent,
    DbSearchFieldsComponent,
  
    DbDetailsComponent,

    OppDetailsComponent,
    OppHeaderComponent,
    SiDetailsEditComponent,
    SiDetailsComponent,
    SiHeaderComponent,
    SrCategoryComponent,
    SrCustomerComponent,
    SrEditComponent,
    SrSupplierComponent,
    DbtDetailsComponent,
    DbtHeaderComponent,
    DbtMatchingComponent,
    DbtQaComponent,
    DbtSearchFieldsComponent,
    DbtListComponent,
    DbtSpendComponent,
    DbtTransactionComponent,
    SingleFilterComponent,
    MultipleFilterComponent,
    MsgBoxComponent,
    ConfirmDialogComponent,
   
];


@NgModule({
  imports: [
    CommonModule,
      DateInputsModule,
    //MaterialModule,
    RouterModule,
      PipesModule,
      GridModule,
      DropDownsModule,
      DialogModule,
      LayoutModule,
      FormsModule,
      ReactiveFormsModule,
    
      InputsModule,
      BrowserModule,
      BrowserAnimationsModule
      //,      AutoCompleteModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }