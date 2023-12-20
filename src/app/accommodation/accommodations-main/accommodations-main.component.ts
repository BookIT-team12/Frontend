import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Accommodation} from "../../model/accommodation.model";

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
  constructor(private accommodationService: AccommodationService, private authService:AuthService) {
  }

  ngOnInit():void{
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadAccommodations(user.email);
      }
    });
  }

  displayFn(value: number | null): string {
    // You can format the value as needed
    return value ? `$${value}` : '';
  }
  loadAccommodations(ownerId:string){
    this.accommodationService.getOwnerAccommodations(ownerId).subscribe(
      (data)=>
      {
        this.accommodations=data;
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
    )
  }
}
