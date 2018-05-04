import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas';
import { EllipsisPipe } from './ellipsis';
import { PublishStatusPipe } from './publish-status';
import { PsrStatusPipe } from './psr-status';
import { PublishActionPipe } from './publish-action';
import { PublishTextPipe } from './publish-text';
import { PsrSourcePipe } from './psr-source';
import { PsrScopePipe } from './psr-scope';
import { PsrOppPipe } from './psr-opp';
import { PsrOverridePipe } from './psr-override';
import { PsrRuleLevelPipe } from './psr-rule-source';
import { DialogColorPipe } from './background-pipe';
import { DialogTitlePipe } from './dialog-title';
export const PIPES = [
  AddCommasPipe,
    EllipsisPipe,
    PublishStatusPipe,
    PublishActionPipe,
    PublishTextPipe,
    PsrStatusPipe,
    PsrSourcePipe,
    PsrOppPipe,
    PsrOverridePipe,
    PsrScopePipe,
    PsrRuleLevelPipe,
    DialogColorPipe,
    DialogTitlePipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }