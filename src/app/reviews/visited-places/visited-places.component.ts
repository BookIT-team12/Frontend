import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {ReservationService} from "../../service/reservation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {ImagesService} from "../../service/images.service";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {Accommodation} from "../../model/accommodation.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-visited-places',
  templateUrl: './visited-places.component.html',
  styleUrls: ['./visited-places.component.css']
})
export class VisitedPlacesComponent implements OnInit{
  searchValue: string;
  guestEmail: string;
  placesVisitedRoot: Set<[Accommodation, boolean|undefined, File|undefined]>;
  placesVisitedToShow: Set<[Accommodation, boolean|undefined, File|undefined]>;
  imagesHeaderFilesRoot: File[];
  imagesHeaderStrings: string[];

  constructor(private accommodation: AccommodationService, private reservations: ReservationService,
              private authService: AuthService, private cdr: ChangeDetectorRef, private imagesService: ImagesService, private router: Router) {
    this.guestEmail = '';
    this.placesVisitedRoot = new Set();
    this.placesVisitedToShow = new Set();
    this.searchValue = '';
    this.imagesHeaderFilesRoot = [];
    this.imagesHeaderStrings = [];
    this.imagesHeaderFilesRoot = [];
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
    this.imagesService.setArrays(this.imagesHeaderFilesRoot, this.imagesHeaderStrings);
    this.imagesService.addFileTypeToImages();
    this.imagesService.turnStringsToImages();
    this.putImagesIntoSets()
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
              this.placesVisitedRoot.add([accommodationModel.first, accommodationIDs[i][1], undefined]);
              this.placesVisitedToShow.add([accommodationModel.first, accommodationIDs[i][1], undefined]);
              this.imagesHeaderStrings.push(accommodationModel.second[0]); //just first picture here!
            }
          }
    } catch (error) {
      console.error('Error fetching places visited:', error);
    }
  }

  async putImagesIntoSets(){
    let i = 0;
    this.placesVisitedRoot.forEach(value => {
      value[2] = this.imagesHeaderFilesRoot[i]
      i++;
    })
    let j = 0;
    this.placesVisitedToShow.forEach(value => {
      value[2] = this.imagesHeaderFilesRoot[j]
      j++;
    })
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
            console.log("end date reservation: ", new Date(list[i].endDate))
            console.log("seven days before today: ", sevenDaysAgo)
            console.log("bool: ", new Date(list[i].endDate) > sevenDaysAgo)
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

  searchVisitedPlaces(){
    let searchTxt = this.searchValue;
    this.placesVisitedToShow.clear();
    if (searchTxt.trim() === '') {
      this.placesVisitedRoot.forEach((value) => {
        this.placesVisitedToShow.add(value);
      });
    } else {
      this.placesVisitedRoot.forEach(value =>{
        if (value[0].name.includes(this.searchValue)){
          this.placesVisitedToShow.add(value);
        }
      })
    }
  }

  goToReviewOwner(place: [Accommodation, (boolean | undefined), (File|undefined)]){
    this.router.navigate(['owner-review/'+place[0].ownerEmail])
  }

  goToReviewAccommodation(place: [Accommodation, (boolean | undefined), (File | undefined)]){
    this.router.navigate(['apartment-review/'+place[0].id])
  }



}
