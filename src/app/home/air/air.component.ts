import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-air',
  imports: [CommonModule],
  templateUrl: './air.component.html',
  styleUrl: './air.component.css'
})
export class AirComponent implements OnInit {
  clouds = Array.from({ length: 10 }, (_, i) => ({
    top: Math.random() * 70,
    left: -20 + i * 12,
    duration: 60 + Math.random() * 30
  }));


  sparkles = Array.from({ length: 20 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 5 + Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2
  }));

  constructor() {}

  ngOnInit(): void {}
}