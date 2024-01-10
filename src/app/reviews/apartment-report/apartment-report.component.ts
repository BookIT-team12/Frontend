import {Component} from '@angular/core';
import {Review, ReviewStatus} from "../../model/review.model";
import {User} from "../../model/user.model";
import {ReviewService} from "../../service/review.service";
import {AuthService} from "../../access-control-module/auth.service";
import {AccommodationService} from "../../service/accommodation.service";

@Component({
  selector: 'app-apartment-report',
  templateUrl: './apartment-report.component.html',
  styleUrls: ['./apartment-report.component.css']
})
export class ApartmentReportComponent {
  approvedReviews: Review[] | undefined;
  owner: User | null | undefined;
  reviewAccommodationNames: string[]

  constructor(private reviewService: ReviewService, private auth: AuthService, private accommodationService: AccommodationService) {
    this.reviewAccommodationNames = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.owner = await this.auth.getCurrentUser().toPromise();
      this.approvedReviews = await this.reviewService.getAllApprovedReviewsOnOwnerAccommodations(this.owner!.email).toPromise();
      if (this.approvedReviews!.length != 0) {
        for (let review of this.approvedReviews!) {
          let name = await this.accommodationService.getNameById(review.accommodationId!).toPromise();
          this.reviewAccommodationNames.push(name!);
        }
      }
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
