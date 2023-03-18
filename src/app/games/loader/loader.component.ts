import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Game } from '../gamesCollection/Game';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
  
  @ViewChild("gameZone") gameZone?: ElementRef<HTMLDivElement>;
  game?: Game;

  constructor(
    private renderer: Renderer2, 
    private route: ActivatedRoute, 
    private router: Router,
    private translate: TranslateService) {}

  ngAfterViewInit(): void {
    // On s'abonne à tout changement de paramètre de la page.
    this.route.params.subscribe(this.loadGame.bind(this));
  }
  async loadGame(params:Params): Promise<void>{
    let getGame: any;
    switch(params['name'].toLowerCase()){
      case "selection": getGame = false; break;
      case "labyrinth":
      case "labyrinthe": getGame = await import("../gamesCollection/canvas/Labyrinth"); break;
      case "morpion": getGame = await import("../gamesCollection/canvas/Morpion"); break;
      case "fillline": getGame = await import("../gamesCollection/canvas/Fillline"); break;
      case "justeprix": getGame = await import("../gamesCollection/cards/JustePrix"); break;
      default: this.router.navigate(["/404"])
    }
    if(this.game){
      this.renderer.removeChild(this.gameZone?.nativeElement,this.game?.gameZone)
    }
    if(getGame){
      const canvas = this.renderer.createElement("canvas");
      this.game = new getGame.default(canvas);
      this.renderer.appendChild(this.gameZone?.nativeElement, this.game?.gameZone);
      
      
    }
    
  }
}
