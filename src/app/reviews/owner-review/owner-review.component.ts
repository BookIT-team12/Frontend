import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";
import {ReviewService} from "../../service/review.service";
import {Review, ReviewStatus} from "../../model/review.model";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-owner-review',
  templateUrl: './owner-review.component.html',
  styleUrls: ['./owner-review.component.css']
})
export class OwnerReviewComponent implements OnInit{
  ownerEmail!: string;
  owner: User | undefined
  author: User | null | undefined;
  authorReviews: Review[] | undefined;
  averageGrade: number | undefined;
  rating: boolean[];
  textComment;
  constructor(private route: ActivatedRoute, private user: UserService, private auth: AuthService,
              private review: ReviewService, public dialog: MatDialog,
              private router: Router) {
    this.owner = undefined
    this.author = null
    this.averageGrade = 0;
    this.rating = [true, false, false, false, false];
    this.textComment = '';
    this.authorReviews = [];
  }
  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.ownerEmail = params['email'];
    });

    try {
      this.owner = await this.user.getUser(this.ownerEmail).toPromise();
    } catch (error) {
      console.error("Error fetching owner:", error);
    }

    try {
      this.author = await this.auth.getCurrentUser().toPromise();
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }

    try {
      this.averageGrade = await this.review.getOwnerAverageGrade(this.ownerEmail).toPromise();
    } catch (error) {
      console.error("Error fetching average grade:", error);
    }

    try {
      this.authorReviews = await this.review.getAllAuthorReviewsOwner(this.author!.email).toPromise();
    } catch (error) {
      console.error("Error fetching author reviews:", error);
    }

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

  deleteReview(review: Review){
    this.review.deleteOwnerReview(review.id).subscribe(value => {
      this.authorReviews = this.authorReviews?.filter(item => item !== review);
    })
  }

  submitReview(){
    if (!this.validateCommentContent()){
      this.openErrDialog();
      return;
    }
    let rating = this.countRating()
    let toSubmit = new Review(null, this.owner?.email, null, this.textComment,
        this.author?.email, new Date(), rating, ReviewStatus.PENDING);
    this.review.createReview(toSubmit).subscribe(value => {
      this.router.navigate(["/main"])
    })
  }



}

@Component({
  selector: 'validation-dialog',
  templateUrl: 'validation.dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgForOf, MatIconModule, MatInputModule],
})
export class ValidationDialogOwnerReview {
  constructor() {
  }
}

