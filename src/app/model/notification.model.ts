
export class CustomNotification {
    id?: number;
    guestEmail: string;
    message: string;
    dateTime: Date;

    constructor(
        guest: string,
        messageString: string
    ) {
        this.guestEmail = guest;
        this.message = messageString;
        this.dateTime = new Date();
    }
}
