import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../service/user.service';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import {Role, User} from "../../model/user.model";
import {
  UserAccountManagementComponent
} from "../../account-managment/user-account-management/user-account-management.component";
import {NavbarComponent} from "../../base/navbar/navbar.component";
import {NavbarAdminComponent} from "../../base/navbar-admin/navbar-admin.component";
import {NavbarOwnerComponent} from "../../base/navbar-owner/navbar-owner.component";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BaseModule} from "../../base/base.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userService: UserService;
  let authService: AuthService;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
        declarations: [RegisterComponent],  //komponenta koja ce biti testirana
        imports: [ReactiveFormsModule, RouterTestingModule],  //uvozimo potrebne module za testiranje
        providers: [    //ovde navodimo sve servise koje cemo mokovati u testu uz pomoc jasmine
          UserService,
          AuthService,
          MatSnackBar
        ]
      }).compileComponents();

    //ovo su prvo prave implementacije
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);

    //ovde zapravo pravis te objekte odnosno pravis njihove spy objekte koje ces koristiti
    let userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setUser', 'setUserDetails']);

    // Sad overridujes da TestBed koristi zapravo ove spy implementacije
    TestBed.overrideProvider(UserService, { useValue: userServiceSpy });
    TestBed.overrideProvider(AuthService, { useValue: authServiceSpy });

    fixture = TestBed.createComponent(RegisterComponent); //pravi registerComponent
    component = fixture.componentInstance; //zatim ga daje ovoj komponenti jer ona moze da se koristi u testu
    fixture.detectChanges();
  });

  it('should create', () => { //provera je li on kreirao ovu register komponentu za testiranje
    expect(component).toBeTruthy();
  });

  it('should submit registration form', () => {

    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'password',
      selectedRole: Role.GUEST
    };

    // Set form values
    component.form.patchValue(user);


    //===u ovom delu ustvari mokujemo servise
    // Mock the userService.registerUser method to return a successful response
    userServiceSpy.registerUser.and.returnValue(of(new User(user.name, user.lastName, user.email, user.password, user.address,
      user.phone,  user.selectedRole, user.confirmPassword, false, false, false,
      false, false, false, true)));

    // Mock the authService.login method to return an AuthResponse
    authServiceSpy.login.and.returnValue(of({ accessToken: 'token' } as any));
    //======

    // Trigger the onSubmit method
    component.onSubmit();

    // Expect userService.registerUser to have been called with the correct user object
    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(jasmine.objectContaining(user));

    // Expect authService.login to have been called with the correct login object
    expect(authServiceSpy.login).toHaveBeenCalledWith(jasmine.objectContaining({
      email: user.email,
      password: user.password
    }));

    // Expect localStorage.setItem to have been called with the correct user token
    expect(localStorage.setItem).toHaveBeenCalledWith('user', 'token');

    // Expect authService.setUser and authService.setUserDetails to have been called
    expect(authServiceSpy.setUser).toHaveBeenCalled();
    expect(authServiceSpy.setUserDetails).toHaveBeenCalled();

    // Expect router.navigate to have been called with the correct route
    expect(component.router.navigate).toHaveBeenCalledWith(['main']);
  });
});
