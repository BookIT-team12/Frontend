import { Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItemClicked(option: string) {
    console.log(`Selected option: ${option}`);
    // Add your logic here based on the selected option
  }

}
