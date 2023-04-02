import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective 
{
  constructor(private el: ElementRef) { }
  
  /**
   * Provoque un scroll horizontal lorsque l'on scroll avec la souris.
   * @param e WheelEvent
   */
  @HostListener("wheel", ["$event"])
  OnWheel(e: WheelEvent)
  {
    if(!this.el.nativeElement.closest(".jp-JP"))return;
    e.preventDefault();
    (<HTMLElement>this.el.nativeElement).scrollLeft -= e.deltaY;
  }

}
