import { Component, OnInit, OnDestroy } from '@angular/core';
import { } from 'googlemaps';

import { GeoLocationService } from './services/maps-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  zoom: number = 18;
  origin = {};
  indication: string = 'doble click en boton para calcular';
  subscription: Subscription;
  destination = {
    lat: 18.853738279076126,
    lng: -97.09854371069298
  };

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  coordinates: any;
  constructor(private geoLocationService: GeoLocationService) {
  }
  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
    origin: {
      icon: 'https://img.icons8.com/office/50px/car.png?office=16',
      draggable: true,
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      label: 'MARKER LABEL',
      opacity: 0.8,
    },

  };

  ngOnInit() {
    this.geoLocationService.getPosition().subscribe(
      (pos: Position) => {
        console.log(pos);
        this.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      });
  }
  getDirection(): any {
    const service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [this.origin],
      destinations: [this.destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, (response, status) => {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        this.indication = `distancia ${response.rows[0].elements[0].distance.text}
          tiempo ${response.rows[0].elements[0].duration.text}`;
        console.log(this.indication);
      }
      if (JSON.stringify(this.origin) === JSON.stringify(this.destination)) {
        this.subscription.unsubscribe();
      }
    });
    return this.indication;
  }
  getDestination(event) {
    this.destination = { lat: event.coords.lat, lng: event.coords.lng };
  }
  start() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(pos => {
        this.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      });
      this. getDirection();
    }, 1000);
   }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


