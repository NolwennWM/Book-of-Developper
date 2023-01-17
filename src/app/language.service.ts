import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages: string[]= ["fr-FR", "en-EN", "jp-JP"];
  language: string = "fr-FR"
  constructor(private translate: TranslateService) { }

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
  changeLanguage(newLang: string)
  {
    if(!this.isPossibleLanguage(newLang))return "idle";
    localStorage.setItem("lang", newLang);
    return "return";   
  }
  isPossibleLanguage(lang?: string|null): lang is string
  {
    lang = this.languages.find(l=>l.includes(lang??""));
    if(!lang)return false;
    this.language = lang;
    return true;
  }
}
