import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomNotification} from "../model/notification.model";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private apiUrl = 'http://localhost:8080/notifications';
    constructor(private http: HttpClient) {}

    getGuestNotifications(guestEmail: string): Observable<CustomNotification[]> {
        const url = `${this.apiUrl}/${guestEmail}`;
        return this.http.get<CustomNotification[]>(url);
    }
    createNotification(dto: CustomNotification) {
        console.log("NOTIFICATION:");
        console.log(dto);
        return this.http.post<CustomNotification>(this.apiUrl, dto);
    }
}
