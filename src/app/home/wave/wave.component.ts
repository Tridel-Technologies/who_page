import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-wave',
  standalone: true,
  imports: [],
  templateUrl: './wave.component.html',
  styleUrl: './wave.component.css'
})
export class WaveComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initOceanWaves();
  }

initOceanWaves() {
  const canvas: any = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const waves = [
    { amplitude: 6, length: 0.01, speed: 0.02, color: 'rgba(0, 110, 255, 0.36)' },
    { amplitude: 9, length: 0.015, speed: 0.015, color: 'rgba(0, 140, 255, 0.41)' },
    { amplitude: 12, length: 0.02, speed: 0.01, color: 'rgba(0, 179, 255, 0.43)' },
    { amplitude: 5, length: 0.03, speed: 0.018, color: 'rgba(0, 213, 255, 0.43)' },
  ];

  let increment = 0;

  // 🚢 Ship X moved towards right
  const shipX = canvas.width * 0.75;

  // 🌟 Generate stars
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    delta: (Math.random() * 0.02) + 0.005,
  }));

  const shipImg = new Image();
  shipImg.src = 'assets/ship.svg';

  function drawWaves(invert = false) {
    waves.forEach((wave) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i++) {
        let y = canvas.height / 2 + Math.sin(i * wave.length + increment * wave.speed) * wave.amplitude;
        if (invert) y = canvas.height - (y - canvas.height / 2) - 10;
        ctx.lineTo(i, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = invert ? wave.color.replace('0.', '0.2') : wave.color;
      ctx.fill();
    });
  }

  function getWaveY(x: number): number {
    const wave = waves[waves.length - 3];
    return canvas.height / 2 + Math.sin(x * wave.length + increment * wave.speed) * wave.amplitude;
  }

  function drawShip() {
    const y = getWaveY(shipX) - 180;
    const shipWidth = 320;
    const shipHeight = 200;

    ctx.drawImage(shipImg, shipX - shipWidth / 2, y, shipWidth, shipHeight);
  }

  function drawMoon() {
    const moonX = canvas.width - 1300;
    const moonY = 120;
    const radius = 60;

    const gradient = ctx.createRadialGradient(moonX, moonY, 5, moonX, moonY, radius * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');

    ctx.beginPath();
    ctx.arc(moonX, moonY, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fffacd';
    ctx.fill();
  }

  function drawStars() {
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();

      star.alpha += star.delta;
      if (star.alpha >= 1 || star.alpha <= 0.3) {
        star.delta *= -1;
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    drawMoon();
    drawShip();
    drawWaves();
    drawWaves(true);

    increment += 1.5;
    requestAnimationFrame(animate);
  }

  shipImg.onload = () => {
    animate();
  };
}

}