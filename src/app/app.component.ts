import { AnimationEvent } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { findIndex } from 'rxjs';
import { languageAnimation, pageAnimation } from './assets/animations/animations';
import { LanguageService } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    pageAnimation,
    languageAnimation
  ],
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent implements AfterViewInit {
  // TODO : Le clique sur un svg avec firefox provoque une erreur.
  @ViewChild("body") body?: ElementRef<HTMLDivElement>;
  @ViewChild("cover") cover?: ElementRef<HTMLDivElement>;
  close:boolean = true;
  book: string = "idle";
  routeIndex: number = 0;
  routes: string[] = [
    "/", "skills", "associations", "jeux/selection"
  ];

  constructor(
    private contexts: ChildrenOutletContexts,
    private translate: TranslateService,
    private lService: LanguageService,
    private cd: ChangeDetectorRef,
    private route: Router
    ) {}
  /**
   * Place une classe de langue par défaut sur la div body.
   */
  ngAfterViewInit():void
  {
    this.body?.nativeElement.classList.add(this.lService.language);
    // this.routes = this.route.config.filter(r=>r.component && r.path != "**");
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
  toggleBook(open: boolean = false): void
  {  
    if(!this.cover)return
    let cover = this.cover.nativeElement;
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
    // TODO passer translate dans language
    if($event.phaseName === "done" && this.book === "return")
    {
      this.body?.nativeElement.classList.remove(this.translate.currentLang);
      this.body?.nativeElement.classList.add(this.lService.language);
      
      this.translate.use(this.lService.language).subscribe(()=>this.setBook("idle")); 
    }
  }
  /**
   * Gère les touches du clavier.
   * @param $event 
   */
  handleKeyboardEvent($event: KeyboardEvent)
  {
    // console.log($event, this.route.url);
    switch($event.key)
    {
      case "ArrowLeft":
        this.changeRoute(-1);
        break;
      case "ArrowRight":
        this.changeRoute(1);
        break;
    }
  }
  /**
   * Tourne les pages du livre.
   * @param nav 
   * @returns 
   */
  changeRoute(nav: number)
  {
    let i = this.routeIndex + nav;
    if(this.close)
    {
      this.toggleBook(true);
      return;
    }
    else if(i < 0 || i >= this.routes.length)
    {
      this.toggleBook();
      return;
    }
    this.routeIndex = i;
    this.route.navigate([this.routes[i]]);
  }
}
