import { Amenity } from './amenity.model';
import { AvailabilityPeriod } from './availability-period.model';
import { Review } from './review.model';
import { Reservation } from './reservation.model';
import { User } from './user.model';

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

export class Accommodation {
  id: number;
  owner: User;
  accommodationType: AccommodationType;
  description: string;
  name: string;
  minGuests: number;
  maxGuests: number;
  amenities: Amenity[];
  reviews: Review[];
  reservations: Reservation[];
  bookingConfirmationType: BookingConfirmationType;
  availabilityPeriods: AvailabilityPeriod[];

  constructor(
    id: number,
    owner: User,
    accommodationType: AccommodationType,
    description: string,
    name: string,
    minGuests: number,
    maxGuests: number,
    amenities: Amenity[],
    reviews: Review[],
    reservations: Reservation[],
    bookingConfirmationType: BookingConfirmationType,
    availabilityPeriods: AvailabilityPeriod[]
  ) {
    this.id = id;
    this.owner = owner;
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
  }
}

