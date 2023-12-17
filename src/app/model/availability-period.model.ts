import {Accommodation} from "./accommodation.model";

export class AvailabilityPeriod {
  id?: number;
  startDate: Date; // Use string or Date based on your needs
  endDate: Date;   // Use string or Date based on your needs
  price: number;
/*
  accommodation: Accommodation;
*/

  constructor(id: number, startDate: Date, endDate: Date, price: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
/*
    this.accommodation = accommodation;
*/
  }
}


