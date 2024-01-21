import {Component, OnInit} from '@angular/core';
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
  styleUrls: ['./accommodations-main.component.css']
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
  accommodationsShow!: Set<[Accommodation,File|undefined]>;
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
  ngOnInit():void{
    this.userRole = this.authService.getRole();
    this.authService.userAccount$.subscribe(user => {
      this.loadAccommodations();
    });
  }

  getUrl(file:File){
    return this.imagesService.getUrl(file)
  }

  loadAccommodations(){
    this.accommodationService.getAllAccommodations().subscribe(
      (data)=>
      {
        this.accommodations=data;
        for(const accommodation of this.accommodations){
          const addressParts: string[] = accommodation.location.address.split(",");
          const location: string = addressParts[1] + " " + addressParts[0] + ", " + addressParts[4] + ", " + addressParts[addressParts.length-1];
          accommodation.location.address = location;
          this.accommodationService.getAccommodationById(accommodation.id!).subscribe(
              (accommodationResponse) => {

              }
          )
        }
        console.log("Accommodations")
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
    );
  }
  applyFilters(){
    if(isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime()) || this.startDate==null || this.endDate==null){
      alert("Please select the dates! ");
    } else if(this.value == '' || this.value == null){
      alert("Please select the number of guests! ");
    }
    else {
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
      this.accommodationService.getFilteredAccommodation(params).subscribe(
          (data: Accommodation[]) => {
            this.accommodations = data;
            console.log("Filtered")
          },
          (error) => {
            console.error('Error applying filters: ', error);
          }
      );
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
