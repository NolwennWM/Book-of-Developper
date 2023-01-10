import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'webmar';

  constructor(
    private contexts: ChildrenOutletContexts,
    private router: Router
    ) {}

  getRouteAnimationData() 
  {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  toggleBook(cover: HTMLDivElement, open: boolean = false)
  {
    console.log(cover);
    
    if(!cover)return;
    if(cover.style.rotate && !open)
    {
      cover.style.rotate = "";
      this.router.navigate(["/"]);
    }
    else
      cover.style.rotate = "y -180deg"; 
  }
}
