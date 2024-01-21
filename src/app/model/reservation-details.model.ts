
import {Reservation, ReservationStatus} from "./reservation.model";

export class ReservationDetails{
    id?: number;
    accommodationId: number;
    accommodationName: string;
    accommodationLocation: string;
    accommodationOwner: string;
    guestEmail: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    price: number;
    status: ReservationStatus;

    constructor(
        reservation: Reservation,
        accommodationName: string,
        accommodationLocation: string,
        accommodationOwner: string
    ) {
        this.id = reservation.id;
        this.accommodationId = reservation.accommodationId;
        this.guestEmail = reservation.guestEmail;
        this.startDate = reservation.startDate;
        this.endDate = reservation.endDate;
        this.numberOfGuests = reservation.numberOfGuests;
        this.price = reservation.price;
        this.status = reservation.status;
        this.accommodationName = accommodationName;
        this.accommodationLocation = accommodationLocation;
        this.accommodationOwner = accommodationOwner;
    }
}


