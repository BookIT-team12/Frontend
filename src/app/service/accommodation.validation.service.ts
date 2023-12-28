import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {min} from "rxjs";
import {Amenity} from "../model/amenity.model";
import {AccommodationLocation} from "../model/location.model";
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class AccommodationValidationService {

  errGroup = new Map<string, boolean|undefined>
  endBeforeStartErr: boolean = false; //boolean for specific case that i will extract out of list of errors
  minGuestBiggerThanMaxGuestErr: boolean = false;

  constructor(private map: MapService) {  }

  setListOfErrors(errors: ValidationErrors|null, amenities: number[], location: AccommodationLocation, images: File[]){
    console.log("PRE minmax i startEnd :", errors)
    console.log("ameniti iz setLifOFERr", amenities)
    this.errGroup.set('minMaxGuestErr', errors?.hasOwnProperty('invalidGuests'))
    this.errGroup.set('endBeforeStartErr', errors?.hasOwnProperty('invalidPeriod'))
    this.errGroup.set('noAmenities', amenities.length === 0)
    this.errGroup.set('noLocation', location === this.map.undefinedBasicLocation)
    this.errGroup.set('noImages', images.length === 0)
    console.log("SVI", this.errGroup)
  }

  getErrorsForDialog(){
    return this.errGroup;
  }


  minMaxGuestsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minGuests: number = control.get('minGuests')?.value;
      const maxGuests: number = control.get('maxGuests')?.value;
      console.log("max", maxGuests, "min", minGuests)
      if (minGuests === null || maxGuests === null){
        return null;
      }
      return maxGuests && minGuests && maxGuests > minGuests ? null : {'invalidGuests': true};
    };
  }

  startBeforeEndValidatior(): ValidatorFn{
    return (control:AbstractControl): { [key: string]: any} | null =>{
      const start = control.get('startDate')?.value;
      const end = control.get('endDate')?.value;
      if (start === null || end === null){
        return null;
      }
      return start && end && start < end ? null : {"invalidPeriod": true};
    };
  }

  startBeforeToday(): ValidatorFn{
    return (control: AbstractControl): { [key: string] : any} | null =>{
      const start = control.value;
      if(start < new Date()){
        return {'invalidStartDate': true}
      }
      return null;
    }
  }

  // validateAmenitiesImagesAndLocation(form: FormGroup, checked: number[], images: File[], selectedLocation: AccommodationLocation){
  //   let errorsToPush: ValidationErrors = []
  //   if (checked.length === 0){
  //     errorsToPush = {...errorsToPush, ...{"noAmenities": true}};
  //   }
  //   if (images.length === 0){
  //     errorsToPush = {...errorsToPush, ...{"noImages": true}}
  //   }
  //   if (selectedLocation === this.map.undefinedBasicLocation){
  //     errorsToPush = {...errorsToPush, ...{"noLocation": true}}
  //   }
  //   form.setErrors(errorsToPush);
  // }




}
