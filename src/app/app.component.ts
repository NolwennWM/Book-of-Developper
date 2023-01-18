import { AnimationEvent } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { languageAnimation, pageAnimation } from './assets/animations/animations';
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
  // TODO : Le clique sur un svg avec firefox provoque une erreur.
  @ViewChild("body") body?: ElementRef;
  close:boolean = true;
  book: string = "idle";

  constructor(
    private contexts: ChildrenOutletContexts,
    private translate: TranslateService,
    private lService: LanguageService,
    private cd: ChangeDetectorRef
    ) {}
  /**
   * Place une classe de langue par défaut sur la div body.
   */
  ngAfterViewInit():void
  {
    this.body?.nativeElement.classList.add(this.lService.language);
  }
  /**
   * Si le livre est ouvert, retourne l'animation liée à la route actuelle.
   * @returns Nom de l'animation liée à la route.
   */
  getRouteAnimationData(): string|undefined
  {
    if(this.close) return;
    
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  /**
   * Ouvre ou ferme la couverture du livre.
   * @param cover div représentant la couverture du livre
   * @param open boolean indiquant si le livre doit être ouvert ou fermé
   * @returns void
   */
  toggleBook(cover: HTMLDivElement, open: boolean = false): void
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
  /**
   * Change l'état du livre avant de relancer la détection des changements.
   * @param action string indiquant l'état du livre.
   */
  setBook(action: string): void
  {
    this.book = action;
    this.cd.detectChanges();
  }
  /**
   * Détecte la fin de l'animation et si il est en mode "retour".
   * Provoque les changements de couleur et de langue avant de placer le livre en mode "idle"
   * @param $event AnimationEvent 
   */
  changeBook($event: AnimationEvent): void
  {
    if($event.phaseName === "done" && this.book === "return")
    {
      this.body?.nativeElement.classList.remove(this.translate.currentLang);
      this.body?.nativeElement.classList.add(this.lService.language);
      
      this.translate.use(this.lService.language).subscribe(()=>this.setBook("idle")); 
    }
  }
}
