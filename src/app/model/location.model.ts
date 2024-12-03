export class AccommodationLocation {
    address : string;
    latitude: number;
    longitude: number;
    id? : number;
    constructor(location: string, latitude: number, longitude: number, id?:number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = location;
        this.id = id;
    }
}
