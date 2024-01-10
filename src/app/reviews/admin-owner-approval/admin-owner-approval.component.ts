import { Component } from '@angular/core';
import {Review, ReviewStatus} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";

@Component({
  selector: 'app-admin-owner-approval',
  templateUrl: './admin-owner-approval.component.html',
  styleUrls: ['./admin-owner-approval.component.css']
})
export class AdminOwnerApprovalComponent {
  reviewsToApprove: Review[] | undefined;

  constructor(private reviewService: ReviewService) {
    this.reviewsToApprove = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.reviewsToApprove = await this.reviewService.getAllReviewOwnerForApproval().toPromise();
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }
  }

  approveRequest(toApprove: Review){
    toApprove.status = ReviewStatus.APPROVED;
    this.reviewService.updateReview(toApprove.id!, toApprove).subscribe(review =>{
      this.reviewsToApprove = this.reviewsToApprove?.filter(review => review !== toApprove);
    })
  }

  deleteRequest(toDelete: Review){
    this.reviewService.deleteOwnerReview(toDelete.id!).subscribe(value =>{
      this.reviewsToApprove = this.reviewsToApprove?.filter(review => review !== toDelete)
    })
  }
}
