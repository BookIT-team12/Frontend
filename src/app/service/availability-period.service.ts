import {booleanAttribute, Injectable} from '@angular/core';
import {AvailabilityPeriod} from "../model/availability-period.model";
import {bounds} from "leaflet";
import {coerceStringArray} from "@angular/cdk/coercion";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityPeriodService {

  existingPeriods:AvailabilityPeriod[] = []
  constructor() { }

  setExistingPeriods(accommodationPeriods: AvailabilityPeriod[]){
    this.existingPeriods = accommodationPeriods;
  }

  doesNewPeriodOverlap(newPeriod: AvailabilityPeriod){
      for (let i = 0; i < this.existingPeriods.length; i++){
          if(newPeriod.startDate < this.existingPeriods[i].endDate && newPeriod.endDate > this.existingPeriods[i].startDate){
              return true;
          }
      }
      return false;
  }

  patchUpHourTimezoneProblem(listToAdjust: AvailabilityPeriod[]){
      for(let i = 0; i != listToAdjust.length; i++){
        listToAdjust[i].startDate.setHours(listToAdjust[i].startDate.getHours() + 1)
        listToAdjust[i].endDate.setHours(listToAdjust[i].endDate.getHours() + 1)
      }
  }

  addPeriod(startDate: Date, endDate: Date, price: number){
    let newPeriod = new AvailabilityPeriod(startDate, endDate, price, undefined);
    if(!this.doesNewPeriodOverlap(newPeriod)){
      this.existingPeriods.push(newPeriod);
      return true;
    }
    return false;
  }

  deletePeriod(selectedToDelete: AvailabilityPeriod){
    const index = this.existingPeriods.indexOf(selectedToDelete);
    if (index !== -1) {
      this.existingPeriods.splice(index, 1);
    }
  }

  changePeriod(selectedToChange: AvailabilityPeriod, startDate: Date, endDate: Date, price: number, id: number){
    const index = this.existingPeriods.indexOf(selectedToChange);
    if (index !== -1) {
      this.existingPeriods.splice(index, 1) //remove the changing one
      const newPeriod = new AvailabilityPeriod(startDate, endDate, price, id);
      const isOverlapping: boolean = this.doesNewPeriodOverlap(newPeriod);

      if (isOverlapping) {
        this.existingPeriods.push(selectedToChange);  //return the old one
        return false;
      }

      this.existingPeriods.push(newPeriod);
      return true;
    }
    return false; // Period not found
  }
}
