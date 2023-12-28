import { Component } from '@angular/core';



@Component({
  selector: 'app-visited-places',
  templateUrl: './visited-places.component.html',
  styleUrls: ['./visited-places.component.css']
})
export class VisitedPlacesComponent {
  searchValue: string;

  constructor() {
    this.searchValue = "";
  }
}
