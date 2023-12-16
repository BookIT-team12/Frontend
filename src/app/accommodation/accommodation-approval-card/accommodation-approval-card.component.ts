import {Component, Input} from '@angular/core';
import {Accommodation, AccommodationStatus} from "../../model/accommodation.model";
import {AccommodationService} from "../../service/accommodation.service";

@Component({
  selector: 'app-accommodation-approval-card',
  templateUrl: './accommodation-approval-card.component.html',
  styleUrls: ['./accommodation-approval-card.component.css']
})
export class AccommodationApprovalCardComponent {
  @Input() accommodation!: Accommodation;
  constructor(private accommodationService: AccommodationService) {} // Inject the service in the constructor



  approveAccommodations(accommodation:Accommodation):void{
    this.accommodationService.approveAccommodation(accommodation.id).subscribe(()=>{
      accommodation.status=AccommodationStatus.APPROVED;
    });
  }

  denyAccommodation(accommodation:Accommodation):void{
    this.accommodationService.denyAccommodation(accommodation.id).subscribe(()=>{
      accommodation.status=AccommodationStatus.DENIED;
    });
  }
}
