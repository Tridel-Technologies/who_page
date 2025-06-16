import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-zoomable',
  imports: [],
  templateUrl: './zoomable.component.html',
  styleUrl: './zoomable.component.css'
})
export class ZoomableComponent {

  scale = 1;

  // Track zoom with mouse wheel
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (delta < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  // Touch-based pinch zoom tracking
  private initialDistance: number | null = null;

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      const dist = this.getTouchDistance(event);
      if (this.initialDistance) {
        const delta = dist - this.initialDistance;
        if (delta > 5) this.zoomIn();
        else if (delta < -5) this.zoomOut();
      }
      this.initialDistance = dist;
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.initialDistance = null;
  }

  private getTouchDistance(event: TouchEvent): number {
    const [touch1, touch2] = event.touches;
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );
  }

  zoomIn() {
    // this.scale = Math.min(this.scale + 0.1, 3);
    console.log('Zooming In, Scale:', this.scale);
     const logo = document.querySelector('.zoom-container');
    logo!.classList.remove('opened');
    logo!.classList.add('opened');
  }

  zoomOut() {
    // this.scale = Math.max(this.scale - 0.1, 0.5);
    console.log('Zooming Out, Scale:', this.scale);
    const logo = document.querySelector('.zoom-container');
    logo!.classList.remove('opened');
    // logo!.classList.add('');
  }
}
