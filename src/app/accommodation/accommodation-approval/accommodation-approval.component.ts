import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationStatus} from "../../model/accommodation.model";
import {AccommodationService} from "../../service/accommodation.service";

@Component({
  selector: 'app-accommodation-approval',
  templateUrl: './accommodation-approval.component.html',
  styleUrls: ['./accommodation-approval.component.css']
})
export class AccommodationApprovalComponent implements OnInit{
  pendingAccommodations:Accommodation[]=[];
  constructor(private accommodationService:AccommodationService) {

  }
  ngOnInit() {
    this.getPendingAccommodations();
  }

  getPendingAccommodations():void{
    this.accommodationService.getPendingAccommodations().subscribe(data=>{
      this.pendingAccommodations=data;
    })
  }


}
