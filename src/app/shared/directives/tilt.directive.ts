import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  private el = inject(ElementRef).nativeElement as HTMLElement;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    this.el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    this.el.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    this.el.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.1)`;
    this.el.style.zIndex = '10';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    this.el.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
    this.el.style.boxShadow = 'none';
    this.el.style.zIndex = '1';
  }
}
