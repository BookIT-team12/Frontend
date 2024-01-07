import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Review, ReviewStatus} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";
import {AccommodationService} from "../../service/accommodation.service";

@Component({
  selector: 'app-admin-apartment-approval',
  templateUrl: './admin-apartment-approval.component.html',
  styleUrls: ['./admin-apartment-approval.component.css']
})
export class AdminApartmentApprovalComponent implements OnInit{
  reviewsToApprove: Review[] | undefined;
  reviewedApartmentNames: string[];

  constructor(private reviewService: ReviewService, private accommodationService: AccommodationService) {
    this.reviewsToApprove = [];
    this.reviewedApartmentNames = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.reviewsToApprove = await this.reviewService.getAllReviewAccommodationForApproval().toPromise();
      // @ts-ignore
      for (let r of this.reviewsToApprove){
        let toPush = await this.accommodationService.getNameById(r.accommodationId!).toPromise();
        // @ts-ignore
        this.reviewedApartmentNames.push(toPush);
      }
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }
  }

  approveRequest(toApprove: Review){
    toApprove.status = ReviewStatus.APPROVED;
    this.reviewService.updateReview(toApprove.id!, toApprove).subscribe(review =>{
      this.reviewsToApprove?.filter(review => review !== toApprove);
    })
  }

  deleteRequest(toDelete: Review){
    this.reviewService.deleteAccommodationReview(toDelete.id!).subscribe(value =>{
      let index = this.reviewsToApprove!.findIndex(review => review.id === toDelete.id);
      this.reviewsToApprove?.filter(review => review !== toDelete)
      this.reviewedApartmentNames.splice(index, 1);
    })
  }

}
