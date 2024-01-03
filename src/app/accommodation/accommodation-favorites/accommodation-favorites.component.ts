import { Component } from '@angular/core';
import { Role, User } from '../../model/user.model';
import { AuthService } from '../../access-control-module/auth.service';
import { UserService } from '../../service/user.service';
import { AccommodationService } from '../../service/accommodation.service';
import { Accommodation } from '../../model/accommodation.model';
import { Router } from '@angular/router';
import {FavoriteService} from "../../service/favorite.accommodation.service";

@Component({
  selector: 'app-accommodation-favorites',
  templateUrl: './accommodation-favorites.component.html',
  styleUrls: ['./accommodation-favorites.component.css'],
})
export class AccommodationFavoritesComponent {
  accommodations: Accommodation[] = [];

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.favoriteService.getUserFavorites(user.email).subscribe(
          (accommodations) => (this.accommodations = accommodations),
          (error) =>
            console.error(
              'Error fetching favorite accommodations!',
              error
            )
        );
      }
    });
  }

  showMoreDetails(accommodationId: number | undefined): void {
    // Redirect to the accommodation details page with the accommodation ID as a parameter
    this.router.navigate(['/accommodation_details', accommodationId]);
  }

  protected readonly Role = Role;
}
