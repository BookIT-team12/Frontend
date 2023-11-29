import { Component } from '@angular/core';
import {User} from "../model/model.user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user : User = {email: "test mejl", address: "test adresa", name: "test ime", lastName: "test prezime",
    password: "test sifra", phone: "test telefon", role: "test uloga"}
}
