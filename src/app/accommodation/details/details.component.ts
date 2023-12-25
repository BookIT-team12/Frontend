import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Amenity} from "../../model/amenity.model";
import {AccommodationResponseModel} from "../../model/accommodation.response.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  accommodation!: Accommodation;
  accommodationId!:number;
  amenities: Amenity[] = [];
  userRole!: Role;
  constructor(private accommodationService: AccommodationService, private authService:AuthService, private route: ActivatedRoute) {
  }
  ngOnInit():void{
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.userRole = this.authService.getRole();
    this.authService.userAccount$.subscribe(user => {
      this.loadAccommodations(this.accommodationId);
    });
  }

  loadAccommodations(id:number){
    console.log("aaa")
    this.accommodationService.getAccommodationById(id).subscribe(
      (data)=>
      {
        this.accommodation=data.first;
        console.log(this.accommodation)
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
        );
  }
}
