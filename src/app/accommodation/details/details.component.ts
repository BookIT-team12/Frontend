import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Amenity} from "../../model/amenity.model";

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
    this.accommodationService.getAccommodationById(id).subscribe(
      (accommodation: Accommodation) => {
        this.accommodation = accommodation;
        console.log(accommodation);

        accommodation.amenities.forEach((amenity: Amenity) => {
            this.amenities.forEach((formAmenity: Amenity) => {
              if (amenity.id == formAmenity.id) {
                const checkbox = {checked: true};
                this.onAmenityChange(checkbox, amenity);
              }
            });
          }
        );
      })
  }
  onAmenityChange(event: any, amenity: Amenity): void {
    // Handle the change in the checkbox state
    if (event.checked) {
      this.amenities.push(amenity);
    } else {
      // Remove the amenity if unchecked
      const index = this.amenities.findIndex(a => a.id === amenity.id);
      if (index !== -1) {
        this.amenities.splice(index, 1);
      }
    }
  }

}
