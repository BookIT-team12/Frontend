import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../service/accommodation.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationResponseModel} from "../../model/accommodation.response.model";
import {ValidationDialogOwnerReview} from "../owner-review/owner-review.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReviewService} from "../../service/review.service";
import {Review} from "../../model/review.model";
import {User} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-apartment-review',
  templateUrl: './apartment-review.component.html',
  styleUrls: ['./apartment-review.component.css']
})
export class ApartmentReviewComponent implements OnInit{
  response: AccommodationResponseModel | undefined;
  selectedAccommodation: Accommodation | null;
  selectedAccommodationId: number;
  accommodationAverageGrade: number | undefined;
  rating: [boolean, boolean, boolean, boolean, boolean];
  amenitiesList: number[];
  textComment: string;
  author: User | null | undefined;
  authorReviews: Review[] | undefined;
  accommodationReviewedNames: string[] | undefined;

  constructor(private accommodationService: AccommodationService, private route:ActivatedRoute, public dialog: MatDialog,
              private reviewService: ReviewService, private auth: AuthService, private router: Router) {
    this.selectedAccommodationId = -100;
    this.selectedAccommodation = null;
    this.rating = [false, false, false, false, false];
    this.accommodationAverageGrade = 0;
    this.amenitiesList = [];
    this.textComment = '';
    this.author = null;
    this.authorReviews = [];
    this.accommodationReviewedNames = [];
  }

  getAmenityValueGUI(id: number): boolean {
    return this.amenitiesList.includes(id);
  }

  ratingStateChangedGUI(index: number){
    if (this.rating[index]){  //it is true so i am taking it to false
      for(let i = index + 1; i!= this.rating.length; i++){
        this.rating[i] = false;
      }
    } else {
      for (let i = index; i != -1; i--){
        this.rating[i] = true;
      }
    }
  }

  countRating(){
    let retVal = 0
    for (let bool of this.rating){
      if (bool){
        retVal++;
      }
    }
    return retVal;
  }

  openErrDialog(){
    this.dialog.open(ValidationDialogOwnerReview);
  }

  validateCommentContent(){
    return this.textComment.trim().length !== 0 && this.textComment.length < 300;
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.selectedAccommodationId = params['id'];
    });

    try {
      this.response = await this.accommodationService.getAccommodationById(this.selectedAccommodationId).toPromise();
      this.selectedAccommodation = this.response!.first;
      console.log("selektovana akomodacija: ", this.selectedAccommodation)
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }

    try {
      this.accommodationAverageGrade = await this.reviewService.getAccommodationAverageGrade(this.selectedAccommodationId).toPromise();
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }

    this.amenitiesList = this.selectedAccommodation!.amenities;

    try {
      this.author = await this.auth.getCurrentUser().toPromise();
    } catch (error) {
      console.error("Error fetching accommodation:", error);
    }

    try {
      this.authorReviews = await this.reviewService.getAllAuthorReviewsAccommodation(this.author!.email).toPromise();
      console.log("reviews of author: ", this.authorReviews)
    } catch (error) {
      console.error("Error fetching author reviews:", error);
    }

    if (this.authorReviews?.length !== 0) {
      // @ts-ignore
      for (let r of this.authorReviews) {
        try {
          let name = await this.accommodationService.getNameById(r.accommodationId!).toPromise()
          if (name != null) {
            this.accommodationReviewedNames?.push(name);
          }
          console.log("accommodations reviewed names: ", this.accommodationReviewedNames)
        } catch (error) {
          console.error("Error fetching author reviewed names:", error);
        }
      }
    }
  }

  submitReview(){
    if (!this.validateCommentContent()){
      this.openErrDialog();
      return;
    }
    let rating: number = this.countRating();
    let r: Review = new Review(null, null, this.selectedAccommodationId, this.textComment,
      this.author?.email, new Date(), rating)
    this.reviewService.createReview(r).subscribe(value => {
      this.router.navigate(['/main']);
    })
  }

  deleteReview(toDelete: Review){
    this.reviewService.deleteAccommodationReview(toDelete.id).subscribe(value => {
      let index = this.authorReviews!.findIndex(review => review.id === toDelete.id);
      this.authorReviews = this.authorReviews?.filter(item => item !== toDelete);
      this.accommodationReviewedNames?.splice(index, 1);
    })
  }

}


@Component({
  selector: 'validation-dialog',
  templateUrl: 'validation.dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgForOf, MatIconModule, MatInputModule],
})
export class ValidationErrorApartmentReview {
  constructor() {
  }
}
