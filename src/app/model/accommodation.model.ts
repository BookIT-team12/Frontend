import { AvailabilityPeriod } from './availability-period.model';
import { Review } from './review.model';
import { Reservation } from './reservation.model';
import {AvailabilityPeriodService} from "../service/availability-period.service";

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

export enum Status{
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
  status:Status;

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
    status:Status
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
      this.availabilityPeriods.push(new AvailabilityPeriod(availabilityPeriods[i].id, availabilityPeriods[i].startDate,
                                    availabilityPeriods[i].endDate, availabilityPeriods[i].price))
    }
    this.status=status;
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

