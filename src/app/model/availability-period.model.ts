import {Accommodation} from "./accommodation.model";

export class AvailabilityPeriod {
  id?: number | null;
  startDate: Date; // Use string or Date based on your needs
  endDate: Date;   // Use string or Date based on your needs
  price: number;
/*
  accommodation: Accommodation;
*/

  constructor(id: number | null | undefined, startDate: Date, endDate: Date, price: number) {
    this.id = id;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    console.log("iz konstruktora perioda")
    console.log(this.startDate)
    console.log(this.endDate)
    this.price = price;
/*
    this.accommodation = accommodation;
*/
  }
}


