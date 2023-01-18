import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages: string[]= ["fr-FR", "en-EN", "jp-JP"];
  language: string = "fr-FR"
  constructor(private translate: TranslateService) { }
  /**
   * Vérifie si une langue est stocké en localStorage.
   * Sinon vérifie la langue du navigateur, 
   * Et si cela n'est pas défaut prend la langue par défaut.
   */
  defaultLanguage(): void
  {
    const oldLanguage = localStorage.getItem("lang");
    
    if(!this.isPossibleLanguage(oldLanguage))
    {
      const navLanguage = navigator.language;
      this.isPossibleLanguage(navLanguage)
    }
      
    this.translate.setDefaultLang(this.language);
    
  }
  /**
   * Stock la langue en localStorage et retourne le nouvel état du livre.
   * @param newLang langue à changer
   * @returns état du livre
   */
  changeLanguage(newLang: string): string
  {
    if(!this.isPossibleLanguage(newLang))return "idle";
    localStorage.setItem("lang", newLang);
    return "return";   
  }
  /**
   * Indique si le string passé en argument fait partie des langues disponibles.
   * Si c'est le cas, le stock dans une propriété.
   * @param lang String à vérifier
   * @returns boolean
   */
  isPossibleLanguage(lang?: string|null): lang is string
  {
    lang = this.languages.find(l=>l.includes(lang??""));
    if(!lang)return false;
    this.language = lang;
    return true;
  }
}
