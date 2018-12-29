import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AppComponent } from './app.component';
import { GeoLocationService } from './services/maps-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvGKbUapjI3E3RCvt--S2nNVKTiDDtSjA'
    }),
    AgmDirectionModule

  ],
  providers: [GeoLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
