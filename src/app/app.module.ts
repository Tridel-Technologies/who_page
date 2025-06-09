import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [


  ],
  imports: [
    BrowserModule,
// ✅ here!
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
