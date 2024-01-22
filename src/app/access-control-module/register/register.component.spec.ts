import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {RegisterComponent} from './register.component';
import {UserService} from '../../service/user.service';
import {of} from 'rxjs';
import {Role, User, UserStatus} from "../../model/user.model";
import {Router, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NavbarNonRegisteredComponent} from "../../base/navbar-non-registered/navbar-non-registered.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccommodationsMainComponent} from "../../accommodation/accommodations-main/accommodations-main.component";


fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  // let routerSpy: jasmine.SpyObj<Router>;  // Declare Router spy

  const routes: Routes = [
    { path: 'localhost:4200/main', component: AccommodationsMainComponent }
  ];

  beforeEach(waitForAsync(() => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['registerUser']);
    // const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);  // Create Router spy
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, NavbarNonRegisteredComponent, AccommodationsMainComponent],
      imports: [
        MatMenuModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatToolbarModule,
        MatFormFieldModule,
        RouterTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [ FormBuilder,
        { provide: UserService, useValue: userServiceSpyObj },
        MatSnackBar,
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit registration form', () => {
    const data = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'password',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(data);

    const user: User = new User( component.form.value.name,
      component.form.value.lastName,
      component.form.value.email,
      component.form.value.password,
      component.form.value.address,
      component.form.value.phone,
      component.form.value.selectedRole as Role,
      component.form.value.confirmPassword,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      UserStatus.PENDING)



    // Mock the userService.registerUser method to return a successful response
    userServiceSpy.registerUser.and.returnValue(of(new User(user.name, user.lastName, user.email, user.password, user.address,
      user.phone,  Role.GUEST, user.confirmPassword, false, false, false,
      false, false, false, true, UserStatus.PENDING)));


    const router = TestBed.inject(Router);

    // Create a spy for the 'navigate' method
    const navigateSpy = spyOn(router, 'navigate');


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect userService.registerUser to have been called with the correct user object
    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(jasmine.objectContaining(user));

    // Expect router.navigate to have been called with the correct route
    expect(navigateSpy).toHaveBeenCalledWith(['localhost:4200/main']);
  });

  it('should be invalid because passwords dont match', () => {
    const data = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      selectedRole: 'GUEST',
      confirmPassword: 'notSamePassword'
    };

    // Set form values
    component.form.patchValue(data);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();
    expect(component.form.errors).toEqual({'passwordMismatch': true})

  });

  it('should be invalid because name is empty', () => {
    const user = {
      name: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'notSamePassword',
      selectedRole: "GUEST"
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because last name is empty', () => {
    const user = {
      name: 'John',
      lastName: '',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'notSamePassword',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because email is empty', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: '',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'notSamePassword',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because password is empty', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'notSamePassword',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because password lenght < 6', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'pass',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'pass',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });


  it('should be invalid because passwords dont match', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234567890',
      confirmPassword: 'notSamePassword',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because address is empty', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '',
      phone: '1234567890',
      confirmPassword: 'password',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because phone is empty', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '',
      confirmPassword: 'password',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

  it('should be invalid because phone contains letters', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      address: '123 Main St',
      phone: '1234ds7890',
      confirmPassword: 'password',
      selectedRole: 'GUEST'
    };

    // Set form values
    component.form.patchValue(user);


    // Trigger the onSubmit method
    component.onSubmit();

    // Expect that this form is false actually
    expect(component.form.valid).toBeFalse();

  });

});
