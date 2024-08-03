import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }



  @HostListener('mouseenter') onMouseOver() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'green');
    // this.renderer.setStyle(this.element.nativeElement, 'padding', '5px 10px');
    // this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.element.nativeElement, 'background-color');
    // this.renderer.removeStyle(this.element.nativeElement, 'padding');
    // this.renderer.removeStyle(this.element.nativeElement, 'transition');
  }

}
