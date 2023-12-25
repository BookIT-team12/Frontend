import { AvailabilityPeriod } from './availability-period.model';
import { Review } from './review.model';
import { Reservation } from './reservation.model';
import {AvailabilityPeriodService} from "../service/availability-period.service";
import {AccommodationLocation} from "./location.model";

export enum BookingConfirmationType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

export enum AccommodationType {
  STUDIO = 'STUDIO',
  APARTMENT = 'APARTMENT',
  ROOM = 'ROOM',
  HOTEL = 'HOTEL'
}

export enum AccommodationStatus{
  APPROVED='APPROVED',
  DENIED='DENIED',
  PENDING='PENDING'

}

export class Accommodation {
  id?: number;
  ownerEmail: string;
  accommodationType: AccommodationType;
  description: string;
  name: string;
  minGuests: number;
  maxGuests: number;
  amenities: number[];
  reviews: Review[];
  reservations: Reservation[];
  bookingConfirmationType: BookingConfirmationType;
  availabilityPeriods: AvailabilityPeriod[];
  status:AccommodationStatus;
  location: AccommodationLocation;

  constructor(
    ownerEmail: string,
    accommodationType: AccommodationType,
    description: string,
    name: string,
    minGuests: number,
    maxGuests: number,
    amenities: number[],
    reviews: Review[],
    reservations: Reservation[],
    bookingConfirmationType: BookingConfirmationType,
    availabilityPeriods: AvailabilityPeriod[],
    status:AccommodationStatus,
    location: AccommodationLocation
  ) {
    this.ownerEmail = ownerEmail;
    this.accommodationType = accommodationType;
    this.description = description;
    this.name = name;
    this.minGuests = minGuests;
    this.maxGuests = maxGuests;
    this.amenities = amenities;
    this.reviews = reviews;
    this.reservations = reservations;
    this.bookingConfirmationType = bookingConfirmationType;
    this.availabilityPeriods = [];
    for(let i = 0; i<availabilityPeriods.length; i++){
      this.availabilityPeriods.push(new AvailabilityPeriod(availabilityPeriods[i].startDate,
                                    availabilityPeriods[i].endDate, availabilityPeriods[i].price, availabilityPeriods[i].id))
    }
    this.status=status;
    this.location = location;
  }

  containsAmenity(id:number){
    return this.amenities.includes(id);
  }

  findAvailabilityPeriod(searchedId : number){
    for(let i = 0; i<this.availabilityPeriods.length; i++){
      if (this.availabilityPeriods[i].id === searchedId){
        return this.availabilityPeriods[i];
      }
    }
    return null;
  }

}

