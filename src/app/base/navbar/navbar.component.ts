import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  menuItemClicked(option: string) {
    console.log(`Selected option: ${option}`);

    // Add logic to navigate based on the selected option
    switch (option) {
      case 'home':
        this.router.navigate(['/main']);
        break;
      case 'manage':
        this.router.navigate(['/manage']);
        break;
      // Add other cases for different options
      default:
        break;
    }
  }
}
