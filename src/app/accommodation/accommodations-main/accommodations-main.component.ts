import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Accommodation} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {ImagesService} from "../../service/images.service";

@Component({
  selector: 'app-accommodations-main',
  templateUrl: './accommodations-main.component.html',
  styleUrls: ['./accommodations-main.component.css'],
})
export class AccommodationsMainComponent implements OnInit {
  startDate:Date = new Date(NaN);
  endDate:Date = new Date(NaN);
  value = '';
  wifi= false;
  parking= false;
  ac_unit= false;
  bath= false;
  pool= false;
  kitchen= false;
  balcony = false;
  accommodations!: Accommodation[];
  userRole!: Role;
  searchBar: string = "";
  accommodationsShow: Set<[Accommodation,File|undefined]> = new Set();
  imagesHeaderFilesRoot: File[] = [];
  imagesHeaderStrings: string[] = [];
  constructor(private router: Router, private accommodationService: AccommodationService,
              private authService:AuthService, private imagesService: ImagesService) {
  this.accommodations=[];
  }
  minSliderValue = 10;
  maxSliderValue = 200;

  // Display function for formatting values
  displayFn(value: number) {
    return value.toFixed(0); // Customize this based on your needs
  }

  // Variable to store both slider values
  sliderValues: number[] = [this.minSliderValue, this.maxSliderValue];
  async ngOnInit(): Promise<void> {
    this.userRole =this.authService.getRole();
    await this.loadAccommodations();
    this.imagesService.setArrays(this.imagesHeaderFilesRoot, this.imagesHeaderStrings);
    this.imagesService.addFileTypeToImages();
    this.imagesService.turnStringsToImages();
    await this.putImagesIntoSets();
  }

  // @ts-ignore
  getUrl(file:File){
    try{
      return this.imagesService.getUrl(file);
    } catch (error) {
      console.error('Error creating object URL:', error)
    }
  }

  async putImagesIntoSets(){
    let i = 0;
    this.accommodationsShow.forEach(value => {
      value[1] = this.imagesHeaderFilesRoot[i]
      i++;
    })
  }

  async loadAccommodations(){
    const data: Accommodation[]|undefined = await this.accommodationService.getAllAccommodations().toPromise();
    this.accommodations = data!;
    for (const accommodation of this.accommodations) {
      const addressParts: string[] = accommodation.location.address.split(",");
      const location: string = addressParts[1] + " " + addressParts[0] + ", " + addressParts[4] + ", " + addressParts[addressParts.length - 1];
      const accommodationModel = await this.accommodationService.getAccommodationById(accommodation.id!).toPromise()
      if(accommodationModel){
        accommodationModel.first.location.address = location;
        this.accommodationsShow.add([accommodationModel.first, undefined]);
        this.imagesHeaderStrings.push(accommodationModel.second[0]);
      }
    }
    console.log("Accommodations");
  }

  async loadFilteredAccommodations(params: HttpParams){
    const data: Accommodation[] = await this.accommodationService.getFilteredAccommodation(params).toPromise();
    this.accommodations = data;
    this.accommodationsShow = new Set();
    this.imagesHeaderFilesRoot = [];
    this.imagesHeaderStrings = [];
    for (const accommodation of this.accommodations) {
      const addressParts: string[] = accommodation.location.address.split(",");
      const location: string = addressParts[1] + " " + addressParts[0] + ", " + addressParts[4] + ", " + addressParts[addressParts.length - 1];
      const accommodationModel = await this.accommodationService.getAccommodationById(accommodation.id!).toPromise();
      if (accommodationModel) {
        accommodationModel.first.location.address = location;
        this.accommodationsShow.add([accommodationModel.first, undefined]);
        this.imagesHeaderStrings.push(accommodationModel.second[0]);
      }
    }
    console.log("Filtered");
  }

  async applyFilters() {
    if (isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime()) || this.startDate == null || this.endDate == null) {
      alert("Please select the dates! ");
    } else if (this.value == '' || this.value == null) {
      alert("Please select the number of guests! ");
    } else {
      let params = new HttpParams();
      params = params.set('wifi', this.wifi);
      params = params.set('parking', this.parking);
      params = params.set('ac', this.ac_unit);
      params = params.set('bath', this.bath);
      params = params.set('pool', this.pool);
      params = params.set('kitchen', this.kitchen);
      params = params.set('balcony', this.balcony);

      if (this.value != '') {
        params = params.set('guests', this.value);
      }
      if (this.searchBar != undefined || this.searchBar != "") {
        params = params.set('searchBar', this.searchBar!);
      }
      if (this.startDate.getDate() != this.endDate.getDate()) {
        params = params.set('startDate', this.startDate.toISOString());
        params = params.set('endDate', this.endDate.toISOString());
        if (this.minSliderValue == 9) {
          params = params.set('minVal', 0);
        } else {
          params = params.set('minVal', this.minSliderValue);
        }
        if (this.maxSliderValue == 201) {
          params = params.set('maxVal', 100000);
        } else {
          params = params.set('maxVal', this.maxSliderValue);
        }
      }
      await this.loadFilteredAccommodations(params);
      this.imagesService.setArrays(this.imagesHeaderFilesRoot, this.imagesHeaderStrings);
      this.imagesService.addFileTypeToImages();
      this.imagesService.turnStringsToImages();
      await this.putImagesIntoSets();
    }
  }

  protected readonly Role = Role;

  bookITClicked(id: number|undefined) {
    if(isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime()) || this.startDate==null || this.endDate==null){
      alert("Please select the dates! ");
    } else if(this.value == '' || this.value == null){
      alert("Please select the number of guests! ");
    }
    else {
      if (id) {
        console.log('ACCOMMODATION ID: ' + id.toString());
        this.router.navigate(['/accommodation_details/' + id.toString() + "/" + this.startDate.getTime() + "/" + this.endDate.getTime() + "/" + this.value]);
      } else {
        alert("id error")
      }
    }
  }
}
