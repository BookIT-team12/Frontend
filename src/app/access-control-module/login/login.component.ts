import {Component, ContentChild} from '@angular/core';
import {User} from "../model/model.user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //note: user made here, its implementation for now doesnt do anything...yet to do something with it
  user : User = {email: "test mejl", address: "test adresa", name: "test ime", lastName: "test prezime",
    password: "test sifra", phone: "test telefon", role: "test uloga"}
  constructor() {}

  hide: boolean = true

}
