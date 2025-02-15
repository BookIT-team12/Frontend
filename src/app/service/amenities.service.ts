import { Injectable } from '@angular/core';
import {Amenity} from "../model/amenity.model";

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  checkedAmenities: number[] = [];
  constructor() { }

  setCheckedAmenities(newVal: number[]){
    this.checkedAmenities = newVal;
  }

  onAmenityChange(event: any, amenity: Amenity): void {
    if (event.checked) {
      this.checkedAmenities.push(amenity.id);
    } else {
      // Remove the amenity if unchecked
      const index = this.checkedAmenities.findIndex((a:number) => a === amenity.id);
      if (index !== -1) {
        this.checkedAmenities.splice(index, 1);
      }
    }
  }
}
