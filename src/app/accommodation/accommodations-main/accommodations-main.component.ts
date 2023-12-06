import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodations-main',
  templateUrl: './accommodations-main.component.html',
  styleUrls: ['./accommodations-main.component.css']
})
export class AccommodationsMainComponent {
  value = '';
  wifi= false;
  parking= false;
  ac_unit= false;
}
