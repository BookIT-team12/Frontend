import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";

@Component({
  selector: 'app-owners-accommodations',
  templateUrl: './owners-accommodations.component.html',
  styleUrls: ['./owners-accommodations.component.css']
})
export class OwnersAccommodationsComponent implements OnInit {
  accommodations: any[]=[];

  constructor(private accommodationService: AccommodationService) {
  }

  ngOnInit():void{
    this.loadAccommodations('pera@gmail.com'); //TODO: IZMENITI DA USER ID NIJE 'ZAKUCAN', VEC DA SE PROSLEDI ID LOGGED IN USER-A
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
