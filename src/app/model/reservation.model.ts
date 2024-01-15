import { Accommodation } from './accommodation.model';
import { User } from './user.model';

export enum ReservationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}
export class Reservation {
  id?: number;
  accommodationId: number;
  guestEmail: string;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;
  valid: boolean;

  constructor(
    accommodation: number,
    guest: string,
    startDate: Date,
    endDate: Date,
    numberOfGuests: number,
    status: ReservationStatus,
    valid: boolean
  ) {
    this.id = 1;
    this.accommodationId = accommodation;
    this.guestEmail = guest;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfGuests = numberOfGuests;
    this.status = status;
    this.valid = valid
  }
}
