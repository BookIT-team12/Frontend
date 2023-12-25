
export class AvailabilityPeriod {
  id?: number ;
  startDate: Date; // Use string or Date based on your needs
  endDate: Date;   // Use string or Date based on your needs
  price: number;

  constructor(startDate: Date, endDate: Date, price: number, id?: number) {
    this.id = id;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.price = price;
  }
}


