import { Component, ElementRef, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { fondu, fonduOptions } from 'src/app/assets/animations/animate';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  @ViewChild("detailEnter") detailEnter?: ElementRef<HTMLDivElement>;
  @ViewChild("detailLeave") detailLeave?: ElementRef<HTMLDivElement>;

  constructor(private language: LanguageService){}

  selectSkill(event: MouseEvent, div: HTMLDivElement)
  {
    if(!(event.target instanceof HTMLImageElement)) return;
    
    div.childNodes.forEach(logo=>{
      if(!(logo.firstChild instanceof HTMLImageElement))return;
      logo.firstChild.classList.remove("active");
    })
    event.target.classList.add("active");
    const skill = event.target.dataset["skill"];
    if(!skill) return;
    this.language.getTranslation("skillsPage.skills."+skill)
      .subscribe(async text=>{        
        if(!this.detailEnter || !this.detailLeave)return;
        // TODO: Gérer le changement avec animate
        const fonduReverse: KeyframeAnimationOptions = {...fonduOptions, direction: "reverse"};
        this.detailEnter.nativeElement.innerHTML = text;
        const animeEnter = this.detailEnter.nativeElement.animate(fondu, fonduOptions);
        const animeLeave = this.detailLeave.nativeElement.animate(fondu, fonduReverse);
        await animeEnter.finished;

        // this.detailEnter.nativeElement.animate();
        // this.detailEnter.nativeElement.style.opacity = "1";
        // this.detailLeave.nativeElement.style.opacity = "0";
        // this.detailLeave.nativeElement.ontransitionend = ()=>{
          
          this.detailLeave!.nativeElement.innerHTML = text;
        //   this.detailEnter!.nativeElement.style.opacity = "0";
        //   this.detailLeave!.nativeElement.style.opacity = "1";
        // }
        // 
      });
  }
}
