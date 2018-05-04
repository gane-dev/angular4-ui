import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { MdProgressSpinnerModule } from '@angular/material';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule  } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ComponentsModule } from './components';
import { MenubarModule, MenuItem } from  'primeng/primeng';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
//Effects
import { PsrRulesEffects } from './effects/psr-rules-effects';
import { OpportunityEffects } from './effects/opp-effects';
import { SiEffects } from './effects/si-effects';
import { SrEffects } from './effects/spend-rule-effects';
import { DbEffects } from './effects/db-effects';
import { DbtEffects } from './effects/dbt-effects';
import { LoginEffects } from './effects/login-effects';
import { LookupEffects } from './effects/lookup-effects';
import { MsgEffects } from './effects/msg-effects';
//guards
import { PageGuard } from './guards/page.guards';
import { DbtGuard } from './guards/dbt.guards';
import { SrGuard } from './guards/sr.guards';
import { AppComponent } from './containers/app';

//pages
import { NotFoundPageComponent } from './containers/not-found-page';
import { HomePageComponent } from './containers/home-page';
import { PsrSearchPageComponent } from './containers/psr-search-page';
import { PsrEditPageComponent } from './containers/psr-edit-page';

import { OppSearchPageComponent } from './containers/opp-search-page';
import { OppEditPageComponent } from './containers/opp-edit-page';
import { SiSearchPageComponent } from './containers/si-search-page';
import { SiEditPageComponent } from './containers/si-edit-page';

import { SrSearchPageComponent } from './containers/sr-search-page';
import { SrEditPageComponent } from './containers/sr-edit-page';

import { DbSearchPageComponent } from './containers/db-search-page';
import { DbEditPageComponent } from './containers/db-edit-page';

import { DbtSearchPageComponent } from './containers/dbt-search-page';
import { DbtEditPageComponent } from './containers/dbt-edit-page';
import { LoginPageComponent } from './containers/login-page';
import { AppMenuPageComponent } from './containers/app-menu-page';
//services
import { LookupDataService } from './services/lookup-data.service';
import { FilterDataService } from './services/filter-data.service';
import { PsrExceptionRuleService } from './services/psr-exception.service';
import { OpportunityService } from './services/opportunity.service';
import { SiService } from './services/si.service';
import { HomePageService } from './containers/services/home-page.service';
import { SpendRuleService } from './services/spend-rule.service';
import { DataBatchService } from './services/data-batch.service';
import { DataBatchTransService } from './services/data-batch-trans.service';
import { LoginService } from './services/login.service';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonFunctionService } from './services/common-functions';
import { MessageService, ErrorLevel } from './services/message.service';
import { routes } from './routes';
import { reducer } from './reducers';
//import { schema } from './db';
import { PipesModule } from './pipes';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './toastr-options';
import { LabelModule } from '@progress/kendo-angular-label';
import { PopupModule } from '@progress/kendo-angular-popup';
//import 'hammerjs';
import { SearchLovComponent } from './components/common/search-lov.component';
//cookie
import { CookieService } from 'angular2-cookie/services/cookies.service';
@NgModule({
    imports: [
       
        ToastModule.forRoot(),
        //MdProgressSpinnerModule,
        PipesModule,
        DateInputsModule,
        GridModule,
    HttpModule, 
    FormsModule,
    JsonpModule ,
    CommonModule,
      BrowserModule,
        BrowserAnimationsModule,
        PopupModule,
    MenubarModule,
    //MaterialModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes, { useHash: true }),
      LayoutModule,
      DropDownsModule,
        InputsModule,
        DialogModule,
        LabelModule,
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     * 
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     * 
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(PsrRulesEffects),
    EffectsModule.run(OpportunityEffects),
    EffectsModule.run(SiEffects),
    EffectsModule.run(SrEffects),
    EffectsModule.run(DbEffects),
    EffectsModule.run(DbtEffects),
    EffectsModule.run(LookupEffects),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(MsgEffects),
    

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
  //  DBModule.provideDB(schema)
   
  ],
  declarations: [
      SearchLovComponent,
      AppComponent,
      NotFoundPageComponent,
      HomePageComponent,
      PsrSearchPageComponent,
      PsrEditPageComponent,
      OppSearchPageComponent,
      SiSearchPageComponent,
      SrSearchPageComponent,
      SrEditPageComponent,
      DbSearchPageComponent,
      DbEditPageComponent,
      DbtSearchPageComponent,
      DbtEditPageComponent,
      OppEditPageComponent,
      SiEditPageComponent,
      LoginPageComponent,
      AppMenuPageComponent
  ],
  providers: [

      CookieService,
      CommonFunctionService,
      HomePageService,
      PsrExceptionRuleService,
      LookupDataService,
      OpportunityService,
      SiService,
      
      SpendRuleService,
      DataBatchService,
      DataBatchTransService,
      FilterDataService,
      LoginService,
      PageGuard,
      DbtGuard,
      SrGuard,
      MessageService,
      { provide: ToastOptions, useClass: CustomOption },
      
      //BROWSER_ANIMATIONS_PROVIDERS
  ],
  entryComponents: [SearchLovComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


