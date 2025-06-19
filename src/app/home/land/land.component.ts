import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-land',
  imports: [CommonModule],
  templateUrl: './land.component.html',
  styleUrl: './land.component.css'
})
export class LandComponent {

  trees = [10, 25, 45, 60, 75, 90];
  grassArray = Array.from({ length: 50 }, (_, i) => i * 2);

  particles = Array.from({ length: 15 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 60 + 10,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 4
  }));

}
