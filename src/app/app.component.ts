import { Component, Input } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
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
  // @Input() cover?: HTMLDivElement;
  title = 'webmar';
  constructor(private contexts: ChildrenOutletContexts) {}
  getRouteAnimationData(cover: HTMLDivElement) 
  {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  toggleBook(cover: HTMLDivElement, open: boolean = false)
  {
    console.log(cover);
    
    if(!cover)return;
    if(cover.style.rotate && !open)
      cover.style.rotate = "";
    else
      cover.style.rotate = "y -180deg";    
  }
}
