import { Component } from '@angular/core';
import { HomePageService } from './services/home-page.service';
@Component({
  selector: 'home-page',
templateUrl: 'html/home-page.html',  
 //providers: [HomePageService]
})
export class HomePageComponent {

  constructor(private homePageService: HomePageService
    ) {

  }
  logout() {
        localStorage.removeItem('userName');
        localStorage.removeItem('pwd');
    }
}
