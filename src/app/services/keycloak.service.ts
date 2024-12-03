import {Injectable} from '@angular/core';
import Keycloak from "keycloak-js";
import {Router} from "@angular/router";
import {User, UserStatus} from "../model/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../access-control-module/auth.service";

@Injectable({
  providedIn: 'root'
})

export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: User | undefined;
  constructor(private router: Router,private http: HttpClient) {
  }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9091',
        realm: 'BookIT',
        clientId: 'bsn'
      });
    }

    return this._keycloak;
  }

  get profile(): User | undefined {
    return this._profile;
  }

  async init() {
    console.log("Initializing keycloak");
    const auth = await this.keycloak?.init({
      // onLoad: 'login-required'
      onLoad: 'check-sso',
    });

    if (auth) {
      console.log("User auth1");
      this._profile = (await this.keycloak?.loadUserProfile()) as User;
      this._profile.token = this.keycloak?.token;
      // @ts-ignore
      this._profile.email = this.keycloak?.profile.username;
      // @ts-ignore
      this._profile.role = this.keycloak?.profile?.attributes.Role;

      localStorage.setItem('user', <string>this.keycloak?.token);


    }
  }

  login() {

    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout(
      // redirectUri: 'http://localhost:9091/realms/booking/protocol/openid-connect/auth?client_id=bsn&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2F&state=bcb481d7-72ac-41f6-8f71-c5bc67e3f939&response_mode=fragment&response_type=code&scope=openid&nonce=dd853d7e-34bd-4847-a2a2-35c4f74c6c28&code_challenge=z3QGLsNkm6PkqCPfnpj-_z_jT-mmxlqs4rT_8jhMLxU&code_challenge_method=S256'
    );
  }
}
