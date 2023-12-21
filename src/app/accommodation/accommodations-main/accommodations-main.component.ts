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
  startDate:Date = new Date(Date.now());
  endDate:Date = new Date(Date.now());
  value = '';
  wifi= false;
  parking= false;
  ac_unit= false;
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
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
    )
  }
  applyFilters(){
    let params = new HttpParams();
      params = params.set('wifi', this.wifi);

      params = params.set('parking', this.parking);

      params = params.set('ac', this.ac_unit);

    if(this.value!=''){
      params = params.set('guests', this.value);
    }
    if (this.startDate.getDate() != this.endDate.getDate()){
      params = params.set('startDate', this.startDate.toISOString());
      params = params.set('endDate', this.endDate.toISOString());
      params = params.set('maxVal', this.maxSliderValue);
      params = params.set('minVal', this.minSliderValue);
    }
    this.accommodationService.getFilteredAccommodation(params).subscribe(
        (data:Accommodation[])=>{
          this.accommodations=data;
          console.log("aaaaaaa")
        },
        (error)=>{
          console.error('Error applying filters: ', error);
        }
    );
  }

  protected readonly Role = Role;

  bookITClicked(id: number|undefined) {
    if(id){console.log('ACCOMMODATION ID: '+id.toString());
      this.router.navigate(['/accommodation_details/'+id.toString()]);}
    else{
      alert("id error")
    }
  }
}
