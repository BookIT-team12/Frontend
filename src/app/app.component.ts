import { Component } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {User} from "./account-managment/model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  constructor() {
    this.currentUser = new User(
    'John Doe',
    'john@example.com',
    'Doe',
    'oldPassword123',
    'newPassword456',
    '123-456-7890',
    '123 Main St',
    null
  );
    console.log(this.currentUser)
}

  title = 'BookIT';

}
