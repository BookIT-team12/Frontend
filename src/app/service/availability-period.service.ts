import { Injectable } from '@angular/core';
import {AvailabilityPeriod} from "../model/availability-period.model";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityPeriodService {

  constructor() { }

  doesNewPeriodOverlap(existingPeriods: AvailabilityPeriod[], newPeriod: AvailabilityPeriod){
      for (let i = 0; i < existingPeriods.length; i++){
          if(newPeriod.startDate < existingPeriods[i].endDate && newPeriod.endDate > existingPeriods[i].startDate){
              return true;
          }
      }
      return false;
  }
}
