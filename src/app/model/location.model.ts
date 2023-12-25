export class AccommodationLocation {
    address : string;
    latitude: number;
    longitude: number;
    constructor(location: string, latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = location;
    }
}
