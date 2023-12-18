import { AvailabilityPeriod } from './availability-period.model';
import { Review } from './review.model';
import { Reservation } from './reservation.model';

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
    this.availabilityPeriods = availabilityPeriods;
    this.status=status;
  }

  containsAmenity(id:number){
    return this.amenities.includes(id);
  }

  getAvailabilityPeriodById(id:number){
      for (let i = 0; i < this.availabilityPeriods.length; i++) {
          if (this.availabilityPeriods[i].id === id){
            return this.availabilityPeriods[i];
          }
      }
      return null;
  }
}

