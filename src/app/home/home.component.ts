import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ZoomableComponent } from "../zoomable/zoomable.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ZoomableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewChecked, AfterViewInit {
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
    'We also deliver survey <br>projects in the Hydrographic value chain <br>as per IHO standards.'
  ];

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

  back(){
    this.is_tapped_main = false;
    this.is_tapped_air = false;
    this.is_tapped_terrain = false;
    this.is_tapped_marine = false;
    this.isTapped_about = false
    this.paths=[];
    const logo = document.querySelector('.logo');
   
      logo?.classList.remove('animated1');
      logo?.classList.remove('animated_r');

  }
  moveGlobe(call: string) {
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
   
    globe?.classList.remove('goleft');
    // setTimeout(() => {
    //   air_line?.classList.remove('go');
    //   water_line?.classList.remove('go');
    //   land_line?.classList.remove('go');
    //   airr?.classList.remove('go');
    //   waterrr?.classList.remove('go');
    //   landdd?.classList.remove('go');
    // }, 50);

    void globe!.offsetWidth; // force reflow
    
    globe!.classList.add('goleft');
    // void air_line!.offsetWidth; // force reflow
    // void water_line!.offsetWidth; // force reflow
    // void land_line!.offsetWidth; // force reflow
    // void airr!.offsetWidth; // force reflow
    // void waterrr!.offsetWidth; // force reflow
    // void landdd!.offsetWidth; // force reflow
    // setTimeout(() => {
    //   air_line!.classList.add('go');
    //   water_line!.classList.add('go');
    //   land_line!.classList.add('go');
    //   airr!.classList.add('go');
    //   landdd!.classList.add('go');
    //   waterrr!.classList.add('go');
    // }, 50);

    setTimeout(() => {
      if (this.is_tapped_air) this.drawPaths_air();
      else if (this.is_tapped_marine) this.drawPaths_marine();
      else if (this.is_tapped_terrain) this.drawPaths_terrain();
    }, 700);
  }

  paths: string[] = [];

  drawPaths_air() {
    // this.setPaths('top-source', ['target1', 'target2', 'target3']);
  }

  drawPaths_marine() {
    // this.setPaths('top-source2', ['center-target1', 'center-target2', 'center-target3', 'center-target4']);
  }

  drawPaths_terrain() {
    // this.setPaths('top-source3', ['bottom-target1', 'bottom-target2', 'bottom-target3', 'bottom-target4', 'bottom-target5']);
  }

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

  // Compute junction point between source and middle of targets
  const minY = Math.min(...targetRects.map(r => r.top + r.height / 2));
  const maxY = Math.max(...targetRects.map(r => r.top + r.height / 2));
  const junctionY = (minY + maxY) / 2;
  const junctionX = sourceX + 50; // 50px to the right

  // Build paths: one from source to junction, others from junction to targets
  const paths: string[] = [];

  // Vertical line from source to junction
  paths.push(`M ${sourceX},${sourceY} L ${junctionX},${junctionY}`);

  for (const rect of targetRects) {
    const targetX = rect.left;
    const targetY = rect.top + rect.height / 2;

    // Path from junction to each target
    paths.push(`M ${junctionX},${junctionY} L ${targetX},${targetY}`);
  }

  this.paths = paths;
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

    return `M ${x1},${y1} C ${midX},${y1 - curve} ${midX},${y2 + curve} ${x2},${y2}`;
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

    this.svgPaths.forEach(pathRef => {
      const pathEl = pathRef.nativeElement;
      const length = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = length.toString();
      pathEl.style.strokeDashoffset = length.toString();

      pathEl.style.animation = 'drawLine 1s forwards ease-in-out';
    });
  }




isOpened(event:Event):boolean{
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
  const classList = Array.from(zoomable.classList).filter(c => c !== 'zoomable-widget' && c!=='opened');
  const widgetClass = classList.join(' '); 
       console.log('target', widgetClass)
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
  const classList = Array.from(zoomable.classList).filter(c => c !== 'zoomable-widget' &&c !=='opened');
  const widgetClass = classList.join(' '); 
       console.log('target', widgetClass)
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

  zoomIn(clas:string) {

    // this.scale = Math.min(this.scale + 0.1, 3);
    console.log('Zooming In, Scale:', this.scale);
     const logo = document.querySelector(`.${clas}`);
    logo!.classList.remove('opened');
    logo!.classList.add('opened');
    this.setZoomedWidgetState(clas)
  }

  zoomOut(clas:string) {
    // this.scale = Math.max(this.scale - 0.1, 0.5);
    console.log('Zooming Out, Scale:', this.scale, clas);
    const logo = document.querySelector(`.${clas}`);
    logo!.classList.remove('opened');
    // logo!.classList.add('');
    this.setZoomedWidgetState('clas')
    this.droppedItems1 = '';
    this.droppedItems =''
    this.dropBuoyis = ''
  }
   zoomOutt(clas: string[]) {
    clas.forEach(className => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.classList.remove('opened');
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
      break;
    case 'usv':
      this.isUsvOpen = true;
      break;
    case 'survay-vessals':
      this.isSurveyVesselOpen = true;
      break;
    case 'central-systems':
      this.isCentralSystemsOpen = true;
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
this.is_tapped_marine=false;
this.is_tapped_terrain=false;
  },700);
}






buoyItems: string[] = ['Data Buoy', 'Navigation Buoy', 'Mooring Buoy'];
DatabuoyItems: string[] = [
  'Coastal Data Buoy',
  'Deep Water Buoy',
  'NUS with Winch',
  'Wind profiler Buoy',
  'wave powered Buoy',
  'Drifter Buoy',
];
USVData: string[] = ['Seafloor TriDrone', 'Seafloor HydroCat-550', 'Aquilon 5600', 'Aquilon 8000'];
Survey_Vessel: string[] = ['Monohul Survey Vessel', 'Catamaran Survey Vessel', 'ECFS & Ship borne Weather station', 'Deck Gears'];
Central_System: string[] = ['TEMS', 'eSpacia', 'ATtide', 'Modelling and Forecasting', 'GeoDB', 'ENC/PNC', 'TSMS'];

currentMainIndex: number = 0;
currentSubIndex: number = 0;

currentusvIndex:number=0;
currentsurveyIndex:number=0;
currentcontrolIndex:number=0;
nextBuoy() {
  if (this.droppedItems === 'Data Buoy') {
    this.currentSubIndex = (this.currentSubIndex + 1) % this.DatabuoyItems.length;
    this.droppedItems1 = this.DatabuoyItems[this.currentSubIndex];
    this.dropBuoyis = this.droppedItems1
  } else {
    this.currentMainIndex = (this.currentMainIndex + 1) % this.buoyItems.length;
    this.droppedItems = this.buoyItems[this.currentMainIndex];

    // reset sub-selection if switching out of Data Buoy
    if (this.droppedItems !== 'Data Buoy') {
      this.droppedItems1 = this.droppedItems;
      this.dropBuoyis = this.droppedItems1
    } else {
      this.currentSubIndex = 0;
      this.droppedItems1 = this.DatabuoyItems[this.currentSubIndex];
      this.dropBuoyis = this.droppedItems1
    }
  }
  console.log(this.droppedItems, this.droppedItems1)
}


prevBuoy() {
  if (this.droppedItems === 'Data Buoy') {
    this.currentSubIndex = (this.currentSubIndex - 1 + this.DatabuoyItems.length) % this.DatabuoyItems.length;
    this.droppedItems1 = this.DatabuoyItems[this.currentSubIndex];
    this.dropBuoyis = this.droppedItems1
  } else {
    this.currentMainIndex = (this.currentMainIndex - 1 + this.buoyItems.length) % this.buoyItems.length;
    this.droppedItems = this.buoyItems[this.currentMainIndex];

    // reset sub-selection if switching out of Data Buoy
    if (this.droppedItems !== 'Data Buoy') {
      this.droppedItems1 = this.droppedItems;
      this.dropBuoyis = this.droppedItems1
    } else {
      this.currentSubIndex = 0;
      this.droppedItems1 = this.DatabuoyItems[this.currentSubIndex];
      this.dropBuoyis = this.droppedItems1
    }
  }
}
nextusv(){
this.currentusvIndex = (this.currentusvIndex + 1) % this.USVData.length
  this.droppedItems2 = this.USVData[this.currentusvIndex];
}
prevusv(){
this.currentusvIndex = (this.currentusvIndex - 1 + this.USVData.length) % this.USVData.length;
this.droppedItems2 = this.USVData[this.currentusvIndex];
}

nextsurvey(){
this.currentsurveyIndex = (this.currentsurveyIndex + 1) % this.Survey_Vessel.length
  this.droppedItems3 = this.Survey_Vessel[this.currentsurveyIndex];
}
prevsurvey(){
this.currentsurveyIndex = (this.currentsurveyIndex - 1 + this.Survey_Vessel.length) % this.Survey_Vessel.length;
this.droppedItems3 = this.Survey_Vessel[this.currentsurveyIndex];
}

nextcontrol(){
this.currentcontrolIndex = (this.currentcontrolIndex + 1) % this.Central_System.length
  this.droppedItems4= this.Central_System[this.currentcontrolIndex];
}
prevcontrol(){
this.currentcontrolIndex = (this.currentcontrolIndex - 1 + this.Central_System.length) % this.Central_System.length;
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

onDrop1(event: DragEvent) {
  event.preventDefault();
  const item = event.dataTransfer?.getData('text/plain');
  if (item) {
    this.droppedItems1 = item;
    this.dropBuoyis = item;
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
      this.droppedItems2= item;
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

  onDrop3(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems3= item;
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
      this.droppedItems4= item;
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
