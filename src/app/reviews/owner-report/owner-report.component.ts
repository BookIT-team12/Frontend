import {Component, OnInit} from '@angular/core';
import {Review, ReviewStatus} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";
import {User} from "../../model/user.model";
import {Route} from "@angular/router";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-owner-report',
  templateUrl: './owner-report.component.html',
  styleUrls: ['./owner-report.component.css']
})
export class OwnerReportComponent implements OnInit{
  approvedReviews: Review[] | undefined;
  owner: User | null | undefined;

  constructor(private reviewService: ReviewService, private auth: AuthService) {  }

  async ngOnInit(): Promise<void> {
    try {
      this.owner = await this.auth.getCurrentUser().toPromise();
      this.approvedReviews = await this.reviewService.getAllApprovedReviewsOnOwner(this.owner!.email).toPromise();
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }
    console.log(this.approvedReviews)
  }

  reportReview(toReport: Review){
    toReport.status = ReviewStatus.REPORTED;
    this.reviewService.updateReview(toReport.id!, toReport).subscribe(value =>{
      this.approvedReviews?.filter(review => review !== toReport)
    })
  }
}
