import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-owners-accommodations',
  templateUrl: './owners-accommodations.component.html',
  styleUrls: ['./owners-accommodations.component.css']
})
export class OwnersAccommodationsComponent implements OnInit {
  accommodations: any[]=[];

  constructor(private accommodationService: AccommodationService, private authService:AuthService) {
  }

  openAccommodationUpdate(accommodationId:number):void{
    console.log(accommodationId);
    this.accommodationService.openUpdatePage(accommodationId);}

  ngOnInit():void{
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadAccommodations(user.email);
      }
    });
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
