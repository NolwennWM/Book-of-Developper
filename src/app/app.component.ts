import { AnimationEvent } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { languageAnimation, pageAnimation } from './assets/animations/animations';
import { LanguageModalComponent } from './language-modal/language-modal.component';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    pageAnimation,
    languageAnimation
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("body") body?: ElementRef;
  close:boolean = true;
  book: string = "idle";

  constructor(
    private contexts: ChildrenOutletContexts,
    private translate: TranslateService,
    private lService: LanguageService
    ) {}
  ngAfterViewInit()
  {
    this.body?.nativeElement.classList.add(this.lService.language);
  }
  getRouteAnimationData() 
  {
    if(this.close) return;
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  toggleBook(cover: HTMLDivElement, open: boolean = false)
  {    
    if(!cover)return;
    if(cover.style.rotate && !open)
    {
      cover.style.rotate = "";
      this.close = true;
    }
    else
    {
      cover.style.rotate = "y -180deg"; 
      this.close = false;
    }
  }
  setBook(action: string)
  {
    console.log(action);
    
    this.book = action
  }
  changeBook($event: AnimationEvent)
  {
    if($event.phaseName === "done" && this.book === "remove")
    {
      this.body?.nativeElement.classList.remove(this.translate.currentLang);
      this.body?.nativeElement.classList.add(this.lService.language);
      
      this.translate.use(this.lService.language).subscribe(()=>this.book = "idle"); 
    }
  }
}
