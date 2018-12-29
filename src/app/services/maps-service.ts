import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
@Injectable()

export class GeoLocationService {
//  constructor() {}
 public getPosition(): Observable<Position> {
    return Observable.create(
        (observer) => {
            navigator.geolocation.watchPosition((pos: Position) => {
                observer.next(pos);
            // tslint:disable-next-line:no-unused-expression
            }), () => {
                console.log('Position is not available');
            },
            // tslint:disable-next-line:no-unused-expression
            {
                enableHighAccuracy: true
              };
        }
    );
 }
}
