import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {ReservationService} from "../../service/reservation.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../service/user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccommodationService} from "../../service/accommodation.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {of} from "rxjs";
import {ReservationStatus} from "../../model/reservation.model";

fdescribe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let httpTestingController: HttpTestingController;

  let reservationService: ReservationService;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    routerSpy.navigate.calls.reset();
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [ReactiveFormsModule, NotificationService, FormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({id: '1', start: '1706137200000', end: '1706310000000', guestsNum: '2'}),
          },
        },
      },],
      providers: [UserService, AccommodationService, {
        provide: Router,
        useValue: routerSpy,
      },]
    });
    reservationService = TestBed.inject(ReservationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['createReservation']);
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call createReservation and navigate when bookITClicked is called', async () => {
    const mockReservation = {accommodationId: 1, guestEmail: "test@gmail.com", startDate: new Date(1706137200000), endDate: new Date(1706310000000), numberOfGuests: 2, status: ReservationStatus.APPROVED, valid: true, price: 0};
    const mockNotification = {guestEmail: "owner@gmail.com", message: "Test", dateTime: new Date()};

    const reservationService = TestBed.inject(ReservationService);
    spyOn(reservationService, 'createReservation').and.returnValue(of(mockReservation)); // Mock the createReservation method

    const notificationService = TestBed.inject(NotificationService);
    spyOn(notificationService, 'createNotification').and.returnValue(of(mockNotification));

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    // Set up component properties as needed
    component.startDate = new Date();
    component.endDate = new Date();
    component.accommodation = { id: 1, bookingConfirmationType: 'AUTOMATIC', ownerEmail: 'owner@test.com' } as any; // Replace with actual data

    // Call the method
    await component.bookITClicked();
    expect(component.invalid).toBeFalsy();

    // Verify expectations
    expect(reservationService.createReservation).toHaveBeenCalledOnceWith(mockReservation);
    expect(notificationService.createNotification).toHaveBeenCalledOnceWith(mockNotification);
    expect(navigateSpy).toHaveBeenCalledWith(['/main']); // Adjust the route as needed
  });

});
