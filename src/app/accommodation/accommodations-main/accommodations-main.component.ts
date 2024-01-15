import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Accommodation} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {HttpParams} from "@angular/common/http";

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
  constructor(private router: Router, private accommodationService: AccommodationService, private authService:AuthService) {
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

  loadAccommodations(){
    this.accommodationService.getAllAccommodations().subscribe(
      (data)=>
      {
        this.accommodations=data;
        console.log("Accommodations")
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
    )
  }
  applyFilters(){
    if(isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime()) || this.startDate==null || this.endDate==null){
      alert("Please select the dates! ");
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
    }
    else {
      if (id) {
        console.log('ACCOMMODATION ID: ' + id.toString());
        this.router.navigate(['/accommodation_details/' + id.toString() + "/" + this.startDate.getTime() + "/" + this.endDate.getTime()]);
      } else {
        alert("id error")
      }
    }
  }
}
