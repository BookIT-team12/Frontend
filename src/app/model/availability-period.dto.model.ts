import {Accommodation} from "./accommodation.model";

export class AvailabilityPeriod {
  id?: number | null;
  startDate: string; // Use string or Date based on your needs
  endDate: string;   // Use string or Date based on your needs
  price: number;
  /*
    accommodation: Accommodation;
  */

  constructor(id: number | null | undefined, startDate: string, endDate: string, price: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    /*
        this.accommodation = accommodation;
    */
  }
}


