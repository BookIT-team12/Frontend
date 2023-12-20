import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Accommodation} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accommodations-main',
  templateUrl: './accommodations-main.component.html',
  styleUrls: ['./accommodations-main.component.css']
})
export class AccommodationsMainComponent implements OnInit {
  value = '';
  wifi= false;
  parking= false;
  ac_unit= false;
  accommodations!: Accommodation[];
  userRole!: Role;
  constructor(private router: Router, private accommodationService: AccommodationService, private authService:AuthService) {
  }
  minSliderValue = 10;
  maxSliderValue = 1000;

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

  protected readonly Role = Role;

  bookITClicked(id: number) {
    console.log('ACCOMMODATION ID: '+id.toString());
    this.router.navigate(['/accommodation_details/'+id.toString()]);
  }
}
