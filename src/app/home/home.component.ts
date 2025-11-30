import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ZoomableComponent } from '../zoomable/zoomable.component';
import { WaveComponent } from './wave/wave.component';
import { AirComponent } from './air/air.component';
import { LandComponent } from './land/land.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ZoomableComponent, WaveComponent, AirComponent, LandComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewChecked, AfterViewInit, OnInit {
  is_tapped_main: boolean = false;
  isTapped_about: boolean = false;
  is_tapped_air: boolean = false;
  is_tapped_marine: boolean = false;
  is_tapped_terrain: boolean = false;

  visibleParagraphs: string[] = [];
  currentIndex = 0;

  allParagraphs = [
    'Tridel specializes in end-to-end Marine, <br>Environmental Survey and monitoring <br>solutions.',
    'We Build Manned & <br>Unmanned Survey Platforms, Buoys and <BR>Monitoring Systems.',
    'Tridel provides turnkey <br>solutions to customer-specific problems, system integration, deployment, data analysis, and system maintenance.',
    'We also deliver survey <br>projects in the Hydrographic value chain <br>as per IHO standards.',
  ];
ngOnInit(): void {
    this.hasMovedLeft = false;
}
  showNextParagraph() {
    if (this.currentIndex < this.allParagraphs.length) {
      this.visibleParagraphs.push(this.allParagraphs[this.currentIndex]);
      this.currentIndex++;
    }
  }

  moveLogo(call: string) {
    const logo = document.querySelector('.logo');
    if (call === 'about') {
      logo?.classList.remove('animated1');
      logo?.classList.remove('animated_r');
      logo?.classList.add('animated_r');
      this.isTapped_about = true;
      this.is_tapped_main = false;
    } else {
      this.isTapped_about = false;
      this.is_tapped_main = true;
      logo?.classList.remove('animated1');
      logo?.classList.remove('animated_r');
      logo?.classList.add('animated1');
    }
  }

  globeAnimationClass!: string; // Add this to your component class

  back() {
    this.is_tapped_air = false;
    this.is_tapped_marine = false;
    this.is_tapped_terrain = false;
    this.hasMovedLeft = false;
    this.paths = [];
    const logo = document.querySelector('.cirle-globe');

    logo?.classList.remove('animated1');
    logo?.classList.remove('animated_r');
    logo?.classList.add('goright');
    this.pathsData = [];

    this.globeAnimationClass = 'goright';

    setTimeout(() => {
      this.is_tapped_main = true;
    }, 700);
  }

  back2() {

    const logo = document.querySelector('.cirle-globe');

    logo?.classList.remove('animated1');
    logo?.classList.remove('animated_r');
    logo?.classList.remove('goleft');
    this.pathsData = [];
    // setTimeout(() => {
    this.is_tapped_main = false;
    this.is_tapped_air = false;
    this.is_tapped_terrain = false;
    this.is_tapped_marine = false;
    this.isTapped_about = false;
    this.hasMovedLeft = false;
    this.paths = [];
    // }, 50);
  }
// Add this flag in your class:
private hasMovedLeft = false;

moveGlobe(call: string) {
  this.paths = []
  this.is_tapped_air = call === 'air';
  this.is_tapped_marine = call === 'marine';
  this.is_tapped_terrain = call === 'terrain';

  const air_line = document.querySelector('.airr') as HTMLElement;
  const water_line = document.querySelector('.water-line') as HTMLElement;
  const land_line = document.querySelector('.land-line') as HTMLElement;
  const airr = document.querySelector('.airrr') as HTMLElement;
  const waterrr = document.querySelector('.waterre') as HTMLElement;
  const landdd = document.querySelector('.landddd') as HTMLElement;
  const globe = document.querySelector('.cirle-globe') as HTMLElement;

  this.is_tapped_main = true;

  // Only trigger globe animation if not already moved
  if (!this.hasMovedLeft) {
    this.globeAnimationClass = 'goleft'; // Trigger left animation

    globe?.classList.remove('goleft');
    globe?.classList.remove('goright');

    void globe!.offsetWidth; // force reflow

    globe!.classList.add('goleft');

    // Mark as moved
    this.hasMovedLeft = true;
  }

  setTimeout(() => {
    if (this.is_tapped_air) this.drawPaths_air();
    else if (this.is_tapped_marine) this.drawPaths_marine();
    else if (this.is_tapped_terrain) this.drawPaths_terrain();
  }, 700);
}


  paths: string[] = [];

  drawPaths_air() {
    this.setPaths('top-source', ['target1', 'target2', 'target3']);
  }

  drawPaths_marine() {
    this.setPaths('top-source2', [
      'center-target1',
      'center-target2',
      'center-target3',
      'center-target4',
      'bottom-target2',
      'bottom-target5',
    ]);
  }

  drawPaths_terrain() {
    this.setPaths('top-source3', [
      'bottom-target1',
      // 'bottom-target2',
      'bottom-target3',
      'bottom-target4',
      // 'bottom-target5',
    ]);
  }
  pathsData: { d: string }[] = [];

//   setPaths(sourceId: string, targetIds: string[]) {
//   const source = document.getElementById(sourceId);
//   if (!source) return;

//   const targetRects: DOMRect[] = [];
//   for (let id of targetIds) {
//     const el = document.getElementById(id);
//     if (el) targetRects.push(el.getBoundingClientRect());
//   }

//   if (targetRects.length === 0) return;

//   const sourceRect = source.getBoundingClientRect();
//   const sourceX = sourceRect.right;
//   const sourceY = sourceRect.top + sourceRect.height / 2;

//   // Compute junction point between source and middle of targets
//   const minY = Math.min(...targetRects.map(r => r.top + r.height / 2));
//   const maxY = Math.max(...targetRects.map(r => r.top + r.height / 2));
//   const spliter = this.is_tapped_air? 3.1:2
//   const junctionY = (minY + maxY) /  spliter;
//   const stopPoint = this.is_tapped_air ? 600:this.is_tapped_marine?100:this.is_tapped_terrain?100:50;
//   const junctionX = sourceX + stopPoint; // 50px to the right

//   // Build paths: one from source to junction, others from junction to targets
//   const paths: string[] = [];

//   // Vertical line from source to junction
//   paths.push(`M ${sourceX},${sourceY} L ${junctionX},${junctionY}`);

//   for (const rect of targetRects) {
//     const targetX = rect.left;
//     const targetY = rect.top + rect.height / 2;

//     // Path from junction to each target
//     paths.push(`M ${junctionX},${junctionY} L ${targetX},${targetY}`);
//   }

//   this.paths = paths;
// }


//   generateCurvedPath(fromEl: HTMLElement, toEl: HTMLElement): string {
//     const fromRect = fromEl.getBoundingClientRect();
//     const toRect = toEl.getBoundingClientRect();

//     const x1 = fromRect.right;
//     const y1 = fromRect.top + fromRect.height / 2;

//     const x2 = toRect.left;
//     const y2 = toRect.top + toRect.height / 2;

//     const midX = (x1 + x2) / 2;
//     const curve = 40;

//     return `M ${x1},${y1} C ${midX},${y1 - curve} ${midX},${y2 + curve} ${x2},${y2}`;
//   }

  setPaths(sourceId: string, targetIds: string[]) {
    const source = document.getElementById(sourceId);
    if (!source) return;

    const targetRects: DOMRect[] = [];
    for (let id of targetIds) {
      const el = document.getElementById(id);
      if (el) targetRects.push(el.getBoundingClientRect());
    }

    if (targetRects.length === 0) return;

    const sourceRect = source.getBoundingClientRect();
    const sourceX = sourceRect.right;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    const distance = this.is_tapped_air ? 650 : 200;
    const spineX = sourceX + distance; // horizontal offset for spine

    const spineYs = targetRects.map((r) => r.top + r.height / 2);
    const minY = Math.min(...spineYs);
    const maxY = Math.max(...spineYs);

    // We'll store just the path data ('d' attribute) here.
    // The length calculation will happen once the SVG path element is rendered in the DOM.
    const pathsData: { d: string }[] = [];

    // 1. Horizontal from source to start of vertical spine
    const path1 = `M ${sourceX},${sourceY} L ${spineX},${sourceY}`;
    pathsData.push({ d: path1 });

    // 2. Vertical spine line
    const path2 = `M ${spineX},${minY} L ${spineX},${maxY}`;
    pathsData.push({ d: path2 });

    // 3. Horizontal lines from spine to each target
    for (const rect of targetRects) {
      const targetX = rect.left;
      const targetY = rect.top + rect.height / 2;
      const path3 = `M ${spineX},${targetY} L ${targetX},${targetY}`;
      pathsData.push({ d: path3 });
    }

    // Assign to a component property that your template can iterate over.
    this.pathsData = pathsData;
  }

  generateCurvedPath(fromEl: HTMLElement, toEl: HTMLElement): string {
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const x1 = fromRect.right;
    const y1 = fromRect.top + fromRect.height / 2;

    const x2 = toRect.left;
    const y2 = toRect.top + toRect.height / 2;

    const midX = (x1 + x2) / 2;
    const curve = 40;

    return `M ${x1},${y1} C ${midX},${y1 - curve} ${midX},${y2 + curve
      } ${x2},${y2}`;
  }

  // ----------- Animation handling --------------
  @ViewChildren('svgPath') svgPaths!: QueryList<ElementRef<SVGPathElement>>;

  ngAfterViewInit() {
    this.preparePaths();
  }

  ngAfterViewChecked() {
    this.preparePaths();
  }

  preparePaths() {
    if (!this.svgPaths) return;

    this.svgPaths.forEach((pathRef) => {
      const pathEl = pathRef.nativeElement;
      const length = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = length.toString();
      pathEl.style.strokeDashoffset = length.toString();

      pathEl.style.animation = 'drawLine 1s forwards ease-in-out';
    });
  }

  isOpened(event: Event): boolean {
    const target = event.target as HTMLElement;
    return target.classList.contains('opened');
  }

  scale = 1;

  // Track zoom with mouse wheel
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const target = event.target as HTMLElement;

    const zoomable = target.closest('.zoomable-widget') as HTMLElement;

    if (!zoomable) return;
    const classList = Array.from(zoomable.classList).filter(
      (c) => c !== 'zoomable-widget' && c !== 'opened'
    );
    const widgetClass = classList.join(' ');
    console.log('target', widgetClass);
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (delta < 0) {
      this.zoomIn(widgetClass);
    } else {
      this.zoomOut(widgetClass);
    }
  }

  // Touch-based pinch zoom tracking
  private initialDistance: number | null = null;

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const target = event.target as HTMLElement;

    const zoomable = target.closest('.zoomable-widget') as HTMLElement;

    if (!zoomable) return;
    const classList = Array.from(zoomable.classList).filter(
      (c) => c !== 'zoomable-widget' && c !== 'opened'
    );
    const widgetClass = classList.join(' ');
    console.log('target', widgetClass);
    if (event.touches.length === 2) {
      const dist = this.getTouchDistance(event);
      if (this.initialDistance) {
        const delta = dist - this.initialDistance;
        if (delta > 5) this.zoomIn(widgetClass);
        else if (delta < -5) this.zoomOut(widgetClass);
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

  zoomIn(clas: string) {
    // this.scale = Math.min(this.scale + 0.1, 3);
    console.log('Zooming In, Scale:', this.scale);
    const logo = document.querySelector(`.${clas}`);
    logo!.classList.remove('opened');
    logo!.classList.add('opened');
    this.setZoomedWidgetState(clas);
  }

  zoomOut(clas: string) {
    this.droppedItems1 = '';
    this.droppedItems = '';
    this.dropBuoyis = '';
    this.showwinch = false;
    this.showvessels = false;
    this.isSurveyVesselOpen = false;
    // this.scale = Math.max(this.scale - 0.1, 0.5);
    console.log('Zooming Out, Scale:', this.scale, clas);
    const logo = document.querySelector(`.${clas}`);
    logo!.classList.remove('opened');
    // logo!.classList.add('');
    this.setZoomedWidgetState('clas');
  }
  zoomOutt(clas: string[]) {
    clas.forEach((className) => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.classList.remove('opened');
        this.showwinch = false;
        this.showvessels = false;
        this.isSurveyVesselOpen = false;
      }
    });

    this.setZoomedWidgetState(''); // Or don't call it at all
    this.droppedItems1 = '';
    this.droppedItems = '';
    this.dropBuoyis = '';
  }

  // currentIindex: number = 0;

  // Air
  isAerialOpen = false;
  isSatelliteOpen = false;
  isWeatherOpen = false;

  // Marine
  isBuoysOpen = false;
  isUsvOpen = false;
  isSurveyVesselOpen = false;
  isCentralSystemsOpen = false;

  // Terrain
  isBeachMonitoringOpen = false;
  isPortMonitoringOpen = false;
  isAirQualityOpen = false;
  isGroundWaterOpen = false;
  isMetOceanOpen = false;

  setZoomedWidgetState(className: string) {
    // Reset all to false
    this.isAerialOpen = false;
    this.isSatelliteOpen = false;
    this.isWeatherOpen = false;

    this.isBuoysOpen = false;
    this.isUsvOpen = false;
    this.isSurveyVesselOpen = false;
    this.isCentralSystemsOpen = false;

    this.isBeachMonitoringOpen = false;
    this.isPortMonitoringOpen = false;
    this.isAirQualityOpen = false;
    this.isGroundWaterOpen = false;
    this.isMetOceanOpen = false;

    switch (className) {
      case 'aerial-mapping':
        this.isAerialOpen = true;
        break;
      case 'satellite-derived':
        this.isSatelliteOpen = true;
        break;
      case 'weather-forecase':
        this.isWeatherOpen = true;
        break;

      case 'buoys':
        this.isBuoysOpen = true;
        this.dropBuoyis = 'Data Buoy';

        break;
      case 'usv':
        this.isUsvOpen = true;
        this.droppedItems2 = 'Aquilon 5600';
        break;
      case 'survay-vessals':
        this.isSurveyVesselOpen = true;
        this.droppedItems3 = 'Monohull Survey Vessel';
        break;
      case 'central-systems':
        this.isCentralSystemsOpen = true;
        this.droppedItems4 = 'TEMS';
        break;

      case 'beach-monitoring':
        this.isBeachMonitoringOpen = true;
        break;
      case 'port-monitoring':
        this.isPortMonitoringOpen = true;
        break;
      case 'air-quality':
        this.isAirQualityOpen = true;
        break;
      case 'ground-water':
        this.isGroundWaterOpen = true;
        break;
      case 'met-ocean':
        this.isMetOceanOpen = true;
        break;
    }
  }

  touchStartX = 0;
  touchEndX = 0;

  mouseStartX = 0;
  mouseEndX = 0;

  // Touch events
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEndd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture(this.touchStartX, this.touchEndX, 'touch');
  }

  // Mouse events
  onMouseDown(event: MouseEvent) {
    this.mouseStartX = event.screenX;
  }

  onMouseUp(event: MouseEvent) {
    this.mouseEndX = event.screenX;
    this.handleSwipeGesture(this.mouseStartX, this.mouseEndX, 'mouse');
  }

  // Shared gesture handler
  handleSwipeGesture(startX: number, endX: number, source: 'touch' | 'mouse') {
    const diffX = endX - startX;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        console.log(`Swiped Right on .logo div (${source})`);
      } else {
        console.log(`Swiped Left on .logo div (${source})`);
      }
    }
    setTimeout(() => {
      this.is_tapped_air = false;
      this.is_tapped_marine = false;
      this.is_tapped_terrain = false;
    }, 700);
  }

  buoyItems: string[] = ['Data Buoy', 'Navigation Buoy', 'Mooring Buoy'];
  DatabuoyItems: string[] = [
    'Coastal Data Buoy',
    'Deep Water Buoy',
    // 'Data Buoy with Winch',  
    'Drifter Buoy',
  ];
  USVData: string[] = [
    'Aquilon 5600',
    'Aquilon 8000',
    'Seafloor TriDrone',
    'Seafloor HydroCat-550',
  ];
  Survey_Vessel: string[] = [
    'Monohull Survey Vessel',
    'Catamaran Survey Vessel',
    'ECFS & Ship Borne Weather Station',
    'Tridel Ark',
    'Deck Gears',
  ];
  deck_gears: string[] = [
    'Mooring Frames & Bottom Mounts',
    'Surface and Subsurface Floats',
    'Profiling Winch',
    'Vessel Side Mount ADCP',
    'Tridel Electric Winch',
  ];
  winch: string[] = ['TEW 500', 'TEW 1500'];
  Central_System: string[] = [
    'TEMS',
    'eSpecia',
    'ATtide',
    // 'Modelling and Forecasting',
    'GeoDB',
    'ENC/PNC',
    'TSMS',
  ];

  currentMainIndex: number = 0;
  currentSubIndex: number = 0;

  currentusvIndex: number = 0;
  currentsurveyIndex: number = 0;
  currentcontrolIndex: number = 0;
// Add this to your component
customBuoySequence: string[] = [
  'Data Buoy',
  'Coastal Data Buoy',
  'Deep Water Buoy',
  'Drifter Buoy',
  'Navigation Buoy',
  'Mooring Buoy'
];

// NEXT functione
nextBuoy() {
  const index = this.customBuoySequence.indexOf(this.dropBuoyis);
  if (index < this.customBuoySequence.length - 1) {
    this.dropBuoyis = this.customBuoySequence[index + 1];
    this.droppedItems1 = this.customBuoySequence[index + 1];
  } else {
    // Optionally loop back to start:
    this.dropBuoyis = this.customBuoySequence[0];
    this.droppedItems1 = this.customBuoySequence[0];
  }
  console.log('Next:', this.dropBuoyis);
}

// PREVIOUS function
prevBuoy() {
  const index = this.customBuoySequence.indexOf(this.dropBuoyis);
  if (index > 0) {
    this.dropBuoyis = this.customBuoySequence[index - 1];
  } else {
    // Optionally go to last item:
    this.dropBuoyis = this.customBuoySequence[this.customBuoySequence.length - 1];
  }
  console.log('Previous:', this.dropBuoyis);
}


  nextusv() {
    this.currentusvIndex = (this.currentusvIndex + 1) % this.USVData.length;
    this.droppedItems2 = this.USVData[this.currentusvIndex];
  }
  prevusv() {
    this.currentusvIndex =
      (this.currentusvIndex - 1 + this.USVData.length) % this.USVData.length;
    this.droppedItems2 = this.USVData[this.currentusvIndex];
  }
  nextsurvey() {
    console.log(this.droppedItems3);
    //  'Monohull Survey Vessel',
    // 'Catamaran Survey Vessel',
    // 'ECFS & Ship Borne Weather Station',
    // 'Deck Gears',
    if (this.droppedItems3 === 'Monohull Survey Vessel' || this.droppedItems3 === 'Catamaran Survey Vessel' || this.droppedItems3 === 'ECFS & Ship Borne Weather Station'
      // ||this.droppedItems3==='Deck Gears'
    ) {
      const i = this.Survey_Vessel.indexOf(this.droppedItems3);
      if (i < this.Survey_Vessel.length - 1) {
        this.droppedItems3 = this.Survey_Vessel[i + 1];
        this.showvessels = false;
        if (this.droppedItems3 === 'Deck Gears') {
          setTimeout(() => {

            this.droppedItems3 = this.deck_gears[0];
          }, 50);
          
          this.showvessels = true;
         
        }
      }
      else {
        this.droppedItems3 = this.Survey_Vessel[0];
      }
    }
     if (this.deck_gears.includes(this.droppedItems3)) {
            const index = this.deck_gears.indexOf(this.droppedItems3);
            if (index < this.deck_gears.length - 1) {
              this.droppedItems3 = this.deck_gears[index + 1];
              if (this.droppedItems3 ==='Tridel Electric Winch') {
                this.droppedItems3 = 'TEW 500';
                this.showwinch = true;
                
              }
            } else {
              this.droppedItems3 = this.deck_gears[0];
            }
          } else if (this.winch.includes(this.droppedItems3)) {
            const index = this.winch.indexOf(this.droppedItems3);
            if (index < this.winch.length - 1) {
              this.droppedItems3 = this.winch[index + 1];
            } else {
              this.droppedItems3 = this.winch[0];
            }
          }



    console.log(this.droppedItems3);
  }

  prevsurvey() {
  
  console.log(this.droppedItems3);

  // Go backward inside winch list
  if (this.winch.includes(this.droppedItems3)) {
    const index = this.winch.indexOf(this.droppedItems3);
    if (index > 0) {
      this.droppedItems3 = this.winch[index - 1];
    } else {
      // Go to last item in deck_gears
      this.droppedItems3 = this.deck_gears[this.deck_gears.length - 1];
    }
  }

  // Go backward inside deck_gears list
  else if (this.deck_gears.includes(this.droppedItems3)) {
    const index = this.deck_gears.indexOf(this.droppedItems3);
    if (index > 0) {
      this.droppedItems3 = this.deck_gears[index - 1];
    } else {
      // Go to last item in Survey_Vessel
      this.droppedItems3 = this.Survey_Vessel[this.Survey_Vessel.length - 1];
    }

    this.showwinch = false;
    this.showvessels = true;
  }

  // Go backward inside Survey_Vessel list
  else if (this.Survey_Vessel.includes(this.droppedItems3)) {
    const index = this.Survey_Vessel.indexOf(this.droppedItems3);
    if (index > 0) {
      this.droppedItems3 = this.Survey_Vessel[index - 1];
    } else {
      // If first item, go to last deck_gear item
      this.droppedItems3 = this.deck_gears[this.deck_gears.length - 1];
    }

    this.showvessels = false;
    if (this.droppedItems3 === 'Deck Gears') {
      setTimeout(() => {
        this.droppedItems3 = this.deck_gears[this.deck_gears.length - 1];
      }, 50);
      this.showvessels = true;
    }
  }

  console.log(this.droppedItems3);
  
    // this.currentsurveyIndex = (this.currentsurveyIndex - 1 + this.Survey_Vessel.length) % this.Survey_Vessel.length;
    // this.droppedItems3 = this.Survey_Vessel[this.currentsurveyIndex];
  }

  nextcontrol() {
    this.currentcontrolIndex =
      (this.currentcontrolIndex + 1) % this.Central_System.length;
    this.droppedItems4 = this.Central_System[this.currentcontrolIndex];
  }
  prevcontrol() {
    this.currentcontrolIndex =
      (this.currentcontrolIndex - 1 + this.Central_System.length) %
      this.Central_System.length;
    this.droppedItems4 = this.Central_System[this.currentcontrolIndex];
  }

  droppedItems: string = '';
  droppedItems1: string = '';
  droppedItems2: string = '';
  droppedItems3: string = '';
  droppedItems4: string = '';
  droppedSubItems: string = '';
  dropBuoyis: string = '';

  rotationcount: number = 0;

  tapped_center_db() {
    this.rotationcount++;
  }

  touchStartXx: number = 0;
  touchStartY: number = 0;
  touchThreshold: number = 30; // Minimum distance to consider it a swipe
  swipedItem: string | null = null;

  onTouchStartt(item: string, event: Event) {
    this.swipedItem = item;
    this.touchStartXx = 0;
    this.touchStartY = 0;
    // Use `touches[0]` for actual touch position
    document.addEventListener('touchmove', this.trackTouch, { passive: false });
    document.addEventListener('touchend', this.finishTouch);
  }

  trackTouch = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      this.touchStartXx = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  };

  finishTouch = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - this.touchStartXx;
    const deltaY = touchEndY - this.touchStartY;

    // Check for horizontal swipe
    if (Math.abs(deltaX) > this.touchThreshold && Math.abs(deltaY) < 50) {
      console.log('Swipe detected for', this.swipedItem);
      // this.handleSwipeDrop(this.swipedItem!); // Your drop logic here
    }

    // Cleanup
    document.removeEventListener('touchmove', this.trackTouch);
    document.removeEventListener('touchend', this.finishTouch);
  };

  onDragStart(event: DragEvent, item: string) {
    event.dataTransfer?.setData('text/plain', item);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  allowDrop1(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems = item;
      this.droppedItems1 = ''; // Reset sub-drop area
    }
  }
  showMooring: boolean = false;
  selectItem(item: string) {
    if (item) {
      this.droppedItems1 = item;
      this.dropBuoyis = item;
      this.droppedItems = item;
      if (item === 'Mooring Buoy') {
        this.showMooring = true;
      } else {
        this.showMooring = false;
      }
      console.log(
        'dropped buoy',
        this.dropBuoyis === 'Mooring Buoy',
        this.dropBuoyis,
        item
      );
    }
  }
  selectItem2(item: string) {
    this.droppedItems2 = item;
    // this.dropBuoyis = item;
    console.log('dropped buoy', this.dropBuoyis, this.droppedItems1);
  }
  selectItem3(item: string) {
    this.droppedvessel = item;
    console.log('vessel is', this.droppedvessel);

    setTimeout(() => {
      const surveyItems = [
        'Monohul Survey Vessel',
        'Catamaran Survey Vessel',
        'ECFS & Ship borne Weather station',
      ];
      if (surveyItems.includes(item)) {
        this.droppedItems3 = item;
      } else {
        this.droppedItems3 = item; // Handles 'Deck Gears' and others
      }
      if (this.droppedvessel === 'Deck Gears') {
        this.droppedItems3 = 'Mooring Frames & Bottom Mounts';
      }
      if (this.droppedvessel === 'Tridel Electric Winch') {
        this.droppedItems3 = 'TEW 500';
      }
      if (
        this.droppedvessel === 'Deck Gears' ||
        this.droppedvessel === 'Mooring Frames & Bottom Mounts' ||
        this.droppedvessel === 'Surface and Subsurface Floats' ||
        this.droppedvessel === 'Profiling Winch' ||
        this.droppedvessel === 'Vessel Side Mount ADCP' ||
        this.droppedvessel === 'Tridel Electric Winch'
      ) {
        this.showvessels = true;
      } else {
        this.showvessels = false;
      }
    }, 50);
    if (
      this.droppedvessel === 'Tridel Electric Winch' ||
      this.droppedvessel === 'TEW 500' ||
      this.droppedvessel === 'TEW 1500'
    ) {
      this.showwinch = true;
    } else {
      this.showwinch = false;
    }
  }
  selectItem4(item: string) {
    this.droppedItems4 = item;
    // this.dropBuoyis = item;
    // console.log("dropped buoy", this.dropBuoyis, this.droppedItems1)
  }

  onDrop1(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems1 = item;
      this.dropBuoyis = item;
      console.log('dropped buoy', this.dropBuoyis, this.droppedItems1);
    }
  }

  onDragStartSubItem(event: DragEvent, item: string) {
    event.dataTransfer?.setData('subItem', item);
  }

  onDropSubItem(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('subItem');
    if (item && !this.droppedSubItems.includes(item)) {
      this.droppedSubItems = item;
    }
  }

  onDragStart2(event: DragEvent, item: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', item);
    }
  }

  allowDrop2(event: DragEvent) {
    event.preventDefault();
  }

  onDrop2(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');

    if (item) {
      this.droppedItems2 = item;
    }
  }

  onDragStart3(event: DragEvent, item: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', item);
    }
  }

  allowDrop3(event: DragEvent) {
    event.preventDefault();
  }
  showvessels: boolean = false;
  showwinch: boolean = false;
  onDrop3(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (!item) return;

    this.droppedvessel = item;
    console.log('vessel is', this.droppedvessel);

    setTimeout(() => {
      const surveyItems = [
        'Monohul Survey Vessel',
        'Catamaran Survey Vessel',
        'ECFS & Ship borne Weather station',
      ];
      if (surveyItems.includes(item)) {
        this.droppedItems3 = item;
      } else {
        this.droppedItems3 = item; // Handles 'Deck Gears' and others
      }

      if (
        this.droppedvessel === 'Deck Gears' ||
        this.droppedvessel === 'Mooring Frames & Bottom Mounts' ||
        this.droppedvessel === 'Surface and Subsurface Floats' ||
        this.droppedvessel === 'Profiling Winch' ||
        this.droppedvessel === 'Vessel Side Mount ADCP' ||
        this.droppedvessel === 'Tridel Electric Winch'
      ) {
        this.showvessels = true;
      } else {
        this.showvessels = false;
      }
    }, 50);
    if (
      this.droppedvessel === 'Tridel Electric Winch' ||
      this.droppedvessel === 'TEW 500' ||
      this.droppedvessel === 'TEW 1500'
    ) {
      this.showwinch = true;
    } else {
      this.showwinch = false;
    }
  }

  droppedvessel: string = '';
  hiddenVessels: string[] = [
    'Monohul Survey Vessel',
    'ECFS & Ship borne Weather station',
    'Catamaran Survey Vessel',
  ];
  shouldShow = !this.hiddenVessels.includes(this.droppedvessel);
  onDragStart5(event: DragEvent, item: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', item);
    }
  }

  allowDrop5(event: DragEvent) {
    event.preventDefault();
  }

  onDrop5(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems3 = item;
      // 'Monohul Survey Vessel', 'Catamaran Survey Vessel', 'ECFS & Ship borne Weather station'
      if (
        this.droppedvessel === 'Monohul Survey Vessel' ||
        this.droppedvessel === 'ECFS & Ship borne Weather station' ||
        this.droppedvessel === 'Catamaran Survey Vessel'
      ) {
        this.droppedvessel = item;
      } else {
      }
    }
  }

  onDragStart4(event: DragEvent, item: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', item);
    }
  }

  allowDrop4(event: DragEvent) {
    event.preventDefault();
  }

  onDrop4(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems4 = item;
    }
  }

  private lastTap = 0;
  lastTapTime: number = 0;

  onTouchEnddd(event: TouchEvent, divId: string) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTapTime;

    if (tapLength < 300 && tapLength > 0) {
      this.toggleFullscreen(divId);
    }

    this.lastTapTime = currentTime;
  }

  toggleFullscreen(divId: string) {
    const element = document.getElementById(divId);
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
