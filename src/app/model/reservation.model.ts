import { Accommodation } from './accommodation.model';
import { User } from './user.model';

export enum ReservationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}
export class Reservation {
  id: number;
  accommodation: Accommodation;
  guest: User;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;

  constructor(
    id: number,
    accommodation: Accommodation,
    guest: User,
    startDate: Date,
    endDate: Date,
    numberOfGuests: number,
    status: ReservationStatus
  ) {
    this.id = id;
    this.accommodation = accommodation;
    this.guest = guest;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfGuests = numberOfGuests;
    this.status = status;
  }
}
