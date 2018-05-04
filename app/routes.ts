import { Routes } from '@angular/router';

import { PageGuard } from './guards/page.guards';
import { DbtGuard } from './guards/dbt.guards';
import { SrGuard } from './guards/sr.guards';

import { NotFoundPageComponent } from './containers/not-found-page';

import { HomePageComponent } from './containers/home-page';
import { PsrSearchPageComponent } from './containers/psr-search-page';
import { PsrEditPageComponent } from './containers/psr-edit-page';
import { OppSearchPageComponent } from './containers/opp-search-page';
import { SiSearchPageComponent } from './containers/si-search-page';
import { SrSearchPageComponent } from './containers/sr-search-page';
import { DbSearchPageComponent } from './containers/db-search-page';
import { DbEditPageComponent } from './containers/db-edit-page';
import { DbtSearchPageComponent } from './containers/dbt-search-page';
import { DbtEditPageComponent } from './containers/dbt-edit-page';
import { OppEditPageComponent } from './containers/opp-edit-page';
import { SiEditPageComponent } from './containers/si-edit-page';
import { SrEditPageComponent } from './containers/sr-edit-page';
import { LoginPageComponent } from './containers/login-page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  {  path: 'home',
    component: HomePageComponent
    },
    {path: 'error',
        component: NotFoundPageComponent
    },
      {
    path: 'login/:id',
    component: LoginPageComponent
    },
  {
      path: 'psr/search',
      component: PsrSearchPageComponent
  },
  {
      path: 'psr/:id',
      component: PsrEditPageComponent
  },
  
  {
      path: 'opp/search',
      component: OppSearchPageComponent
  },

  {
      path: 'opp',
      component: OppEditPageComponent
  },
  {
      path: 'si/search',
      component: SiSearchPageComponent
  },
  {
      path: 'si/:id',
      component: SiEditPageComponent
  },
    
  {
      path: 'sr/search',
      component: SrSearchPageComponent
  },
  {
      path: 'sr/:id',
      canActivate: [SrGuard],
      component: SrEditPageComponent
  },
  {
      path: 'db/search',
      //canActivate: [ PageGuard ],
      component: DbSearchPageComponent
  },
  {
      path: 'db/:id',
    component: DbEditPageComponent
  },
  {
      path: 'dbt/search',
      component: DbtSearchPageComponent
  },
  {
      path: 'dbt',
  //    canActivate: [DbtGuard],
      
      component: DbtEditPageComponent
  },
  //{
  //  path: 'book/:id',
  //  canActivate: [ BookExistsGuard ],
  //  component: ViewBookPageComponent
  //},
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
