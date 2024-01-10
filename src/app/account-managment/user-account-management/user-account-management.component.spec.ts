import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import { UserAccountManagementComponent } from './user-account-management.component';
import {AuthService} from "../../access-control-module/auth.service";
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
import {Observable, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavbarOwnerComponent} from "../../base/navbar-owner/navbar-owner.component";
import {NavbarAdminComponent} from "../../base/navbar-admin/navbar-admin.component";
import {NavbarComponent} from "../../base/navbar/navbar.component";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {BaseModule} from "../../base/base.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const mockUser: User = {
  name: 'John',
  lastName: 'Doe',
  password: 'password',
  confirmPassword: 'password',
  phone: '123456789',
  address: '123 Main St',
  email: 'john@example.com',
  role: Role.GUEST,
  isBlocked: false,
  isReported: false,
};

fdescribe('UserAccountManagementComponent', () => {

  let component: UserAccountManagementComponent;
  let fixture: ComponentFixture<UserAccountManagementComponent>;
  let authService: AuthService;
  let userService:UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      declarations: [UserAccountManagementComponent, NavbarComponent, NavbarAdminComponent, NavbarOwnerComponent],
      imports: [HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        BaseModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        AuthService,
        UserService,
        MatSnackBar,
      ],
    }).compileComponents();

    authService=TestBed.inject(AuthService);
    userService=TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);


    fixture = TestBed.createComponent(UserAccountManagementComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no unexpected requests are outstanding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch user data on init', fakeAsync(() => {

    spyOn(authService, 'getCurrentUser').and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(authService.getCurrentUser).toHaveBeenCalled();

    const req = httpTestingController.expectOne('http://localhost:8080/users/john@example.com');
    req.flush(mockUser);

    tick();
    fixture.detectChanges();

    expect(component.form.value.name).toBe(mockUser.name);
    expect(component.form.value.email).toBe(mockUser.email);
    expect(component.form.value.lastName).toBe(mockUser.lastName);
    expect(component.form.value.password).toBe(mockUser.password);
    expect(component.form.value.confirmPassword).toBe(mockUser.confirmPassword);
    expect(component.form.value.address).toBe(mockUser.address);
    expect(component.form.value.phone).toBe(mockUser.phone);
    expect(component.user).toEqual(mockUser);

    httpTestingController.verify();
  }));

  it('should update an account when the form is valid', fakeAsync(() => {
    const updatedUser = {
      name: 'John',
      lastName: 'DoeNew',
      password: 'newPassword',
      confirmPassword: 'newPassword',
      phone: '123456789',
      address: '123 New Main St',
      email: 'john@example.com',
      role: Role.GUEST,
      isBlocked: false,
      isReported: false,
    };

    const updateUserResponse: User = {
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      password: updatedUser.password,
      confirmPassword: updatedUser.confirmPassword,
      phone: updatedUser.phone,
      address: updatedUser.address,
      email: updatedUser.email,
      role: Role.GUEST,
      isBlocked: false,
      isReported: false,
    };

    spyOn(userService, 'updateUser').and.callFake((updatedUserArg: User) => {
      updatedUserArg.email = updatedUser.email;
      return of(updateUserResponse);
    });

    component.form.setValue({
      email: updatedUser.email,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      password: updatedUser.password,
      confirmPassword: updatedUser.confirmPassword,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });

    component.updateAccount();

    tick();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(userService.updateUser).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({
          email: updatedUser.email,
          name:updatedUser.name,
          lastName:updatedUser.lastName,
          password:updatedUser.password,
          confirmPassword:updatedUser.confirmPassword,
          address:updatedUser.address,
          role:updatedUser.role,
          isBlocked:updatedUser.isBlocked,
          phone:updatedUser.phone
        })
      );

      expect(component.form.value.email).toBe(updatedUser.email);
      expect(component.form.value.name).toBe(updatedUser.name);
      expect(component.form.value.lastName).toBe(updatedUser.lastName);
      expect(component.form.value.password).toBe(updatedUser.password);
      expect(component.form.value.confirmPassword).toBe(updatedUser.confirmPassword);
      expect(component.form.value.address).toBe(updatedUser.address);
      expect(component.form.value.phone).toBe(updatedUser.phone);
    });
  }));
});
