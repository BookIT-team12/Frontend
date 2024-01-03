import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {ReservationService} from "../../service/reservation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {ImagesService} from "../../service/images.service";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {Accommodation} from "../../model/accommodation.model";


@Component({
  selector: 'app-visited-places',
  templateUrl: './visited-places.component.html',
  styleUrls: ['./visited-places.component.css']
})
export class VisitedPlacesComponent implements OnInit{
  searchValue: string;
  guestEmail: string;
  placesVisited: Set<[Accommodation, boolean|undefined]>;
  imagesHeaderFiles: File[];
  imagesHeaderStrings: string[];

  constructor(private accommodation: AccommodationService, private reservations: ReservationService,
              private authService: AuthService, private cdr: ChangeDetectorRef, private imagesService: ImagesService) {
    this.guestEmail = '';
    this.placesVisited = new Set();
    this.searchValue = '';
    this.imagesHeaderFiles = [];
    this.imagesHeaderStrings = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser().toPromise();
      if (user) {
        this.guestEmail = user.email;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    await this.getPlacesVisited()
    this.imagesService.setArrays(this.imagesHeaderFiles, this.imagesHeaderStrings);
    this.imagesService.addFileTypeToImages();
    this.imagesService.turnStringsToImages();
  }

  async getPlacesVisited() {  //note: maybe is not efficient!!...if slow on tests should be made more efficient with less calls to backend
    try { //todo: test this one with multiple reservations and accommodations
      const guestReservations = await this.reservations.getGuestReservations(this.guestEmail).toPromise();
      console.log("rezervacije: ", guestReservations)
      let accommodationIDs = this.filterResList(guestReservations);
      console.log("accommodacije id", accommodationIDs)
      for (let i = 0; i!=accommodationIDs.length; i++){
            const accommodationModel = await this.accommodation.getAccommodationById(accommodationIDs[i][0]).toPromise();
            if (accommodationModel) {
              this.placesVisited.add([accommodationModel.first, accommodationIDs[i][1]]);
              this.imagesHeaderStrings.push(accommodationModel.second[0]); //just first picture here!
            }
          }


    } catch (error) {
      console.error('Error fetching places visited:', error);
    }
    console.log("places visited: ", this.placesVisited);
  }

  filterResList(list: Reservation[]|undefined) {
    let retVal: [number, boolean | undefined][] = [];
    if (list) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      let map: Map<number, boolean> = new Map<number, boolean>();
      for (let i = 0; i !== list.length; i++) {
        if (list[i].status === ReservationStatus.APPROVED && new Date(list[i].endDate) < new Date()) {
          if (map.get(list[i].accommodationId) !== true || !map.has(list[i].accommodationId)) {
            map.set(list[i].accommodationId, new Date(list[i].endDate) > sevenDaysAgo)
          }
        }
      }

      for (const key of map.keys()) {
        retVal.push([key, map.get(key)]);
      }
    }
    return retVal;
  }

  getUrl(file:File){
    return this.imagesService.getUrl(file)
  }
}
