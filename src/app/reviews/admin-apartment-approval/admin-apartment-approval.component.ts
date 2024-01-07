import {Component, OnInit} from '@angular/core';
import {Review, ReviewStatus} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";

@Component({
  selector: 'app-admin-apartment-approval',
  templateUrl: './admin-apartment-approval.component.html',
  styleUrls: ['./admin-apartment-approval.component.css']
})
export class AdminApartmentApprovalComponent implements OnInit{
  reviewsToApprove: Review[] | undefined;

  constructor(private reviewService: ReviewService) {
    this.reviewsToApprove = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.reviewsToApprove = await this.reviewService.getAllReviewAccommodationForApproval().toPromise();
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
      this.reviewsToApprove?.filter(review => review !== toDelete)
    })
  }

}
