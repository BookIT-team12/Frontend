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
  accommodationId: number;
  guestId: string;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;

  constructor(
    id: number,
    accommodation: number,
    guest: string,
    startDate: Date,
    endDate: Date,
    numberOfGuests: number,
    status: ReservationStatus
  ) {
    this.id = id;
    this.accommodationId = accommodation;
    this.guestId = guest;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfGuests = numberOfGuests;
    this.status = status;
  }
}
