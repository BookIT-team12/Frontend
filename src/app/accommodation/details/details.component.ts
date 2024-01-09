import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../model/accommodation.model';
import { Role, User } from '../../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../../service/accommodation.service';
import { AuthService } from '../../access-control-module/auth.service';
import { Amenity } from '../../model/amenity.model';
import { FavoriteService } from '../../service/favorite.accommodation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  accommodation!: Accommodation;
  accommodationId!: number;
  amenities: Amenity[] = [];
  userRole!: Role;
  user!: User;
  isFavorite$: Observable<boolean>; // Observable to hold the isFavorite state

  constructor(
      private accommodationService: AccommodationService,
      private authService: AuthService,
      private route: ActivatedRoute,
      private favoriteService: FavoriteService
  ) {
    this.isFavorite$ = new Observable<boolean>();
  }

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.userRole = this.authService.getRole();
    this.authService.userAccount$.subscribe((user) => {
      this.loadAccommodations(this.accommodationId);
    });

    this.updateIsFavorite(); // Add this line to initialize isFavorite$

    this.isFavorite$.subscribe((isFavorite) => {
      console.log('Is Favorite:', isFavorite);
    });

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.updateIsFavorite();
      }
    });


  }

  loadAccommodations(id: number) {
    console.log('aaa');
    this.accommodationService.getAccommodationById(id).subscribe(
        (data) => {
          this.accommodation = data.first;
          this.updateIsFavorite();
        },
        (error) => {
          console.error('Error loading accommodations: ', error);
        }
    );
  }

  //todo: TESTIRATI DODAVANJE U FAVORITE NAKON STO ZAVRSIS SINGLE DETAIL PAGE!!!!!!
  // dodata funkcija za dodavanje u favorites @umuskinja
  // stilizuj html/css, kada budes radio


  //Function to check if the accommodation is a favorite
  updateIsFavorite(): void {
    if (this.user?.email && this.accommodation?.id) {
      this.isFavorite$ = this.favoriteService.isFavorite(
        this.user.email,
        this.accommodation.id
      );
    } else {
      // Handle the case where either user email or accommodation id is undefined
      this.isFavorite$ = new Observable<boolean>();
    }
  }

  // Function to handle adding to favorites
  toggleFavorite(): void {
    if (this.user && this.accommodation) {
      this.isFavorite$.subscribe((isFavorite) => {
        if (isFavorite) {
          // Remove from favorites
          if (this.accommodation.id) {
            this.favoriteService.removeFavorite(
              this.user.email,
              this.accommodation.id
            );
          }
        } else {
          // Add to favorites
          if (this.accommodation.id) {
            this.favoriteService.addFavorite(
              this.user.email,
              this.accommodation.id
            );
          }
        }
      });
    }
  }
}
