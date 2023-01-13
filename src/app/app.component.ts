import { AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { languageAnimation, pageAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    pageAnimation,
    languageAnimation
  ]
})
export class AppComponent {
  close:boolean = true;
  languages: string[]= ["fr-FR", "en-EN", "jp-JP"];
  language: string = "fr-FR";
  book: string = "idle";

  constructor(
    private contexts: ChildrenOutletContexts,
    private translate: TranslateService
    ) {
      this.defaultLanguage();
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
  defaultLanguage()
  {
    const oldLanguage = localStorage.getItem("lang");
    
    if(!this.isPossibleLanguage(oldLanguage))
    {
      const navLanguage = navigator.language;
      this.isPossibleLanguage(navLanguage)
    }
      
    this.translate.setDefaultLang(this.language);
  }
  changeLanguage($event: Event)
  {
    const newLang = ($event.target as HTMLSpanElement).dataset["lang"];
    if(!this.isPossibleLanguage(newLang))return;
    localStorage.setItem("lang", newLang);
    this.book = "remove";
    // this.translate.use(newLang)
    //     .subscribe(()=>/* this.book = "idle" */"");    
  }
  isPossibleLanguage(lang?: string|null): lang is string
  {
    lang = this.languages.find(l=>l.includes(lang??""));
    if(!lang)return false;
    this.language = lang;
    return true;
  }
  changeBook($event: AnimationEvent)
  {
    if($event.phaseName === "done")
      this.translate.use(this.language)
        .subscribe(()=> this.book = "idle"); 
  }
}
