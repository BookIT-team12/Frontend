import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Role, User, UserStatus} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})

export class UserAccountManagementComponent implements OnInit {
  hide: boolean = true;
  hideConfirmation: boolean = true;
  user: User | undefined;
  form!:FormGroup
  userRole!: Role;
  userEmail!:String;
  isFormValid=false;

  constructor(private authService:AuthService,private userService:UserService, private fb:FormBuilder,
              private router: Router) {}


  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    // You can initialize form controls and call fetchUserData here
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      ownerAnswerNotification: true,
      gradedMyAccommodationNotification: true,
      gradedMeNotification: true,
      resCanceledNotification:true,
      resCreatedNotification:true
    });

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.fetchUserData(user.email);
      }
    })

    this.form.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }

  fetchUserData(email: string): void {
    this.userService.getUser(email).subscribe(
      (user) => {
        this.user = user;
        this.userEmail=user.email;
        this.form.patchValue({
          email:user.email,
          name: user.name,
          lastName: user.lastName,
          password: "",
          confirmPassword: "",
          phone: user.phone,
          address: user.address,
          ownerAnswerNotification: user.ownerAnswerNotification,
          gradedMyAccommodationNotification: user.gradedMyAccommodationNotification,
          gradedMeNotification: user.gradedMeNotification,
          resCanceledNotification: user.resCanceledNotification,
          resCreatedNotification: user.resCreatedNotification
        });
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }


  deleteAccount():void{

    this.authService.getCurrentUser().subscribe(user=>{
      if (user) {
        this.userService.deleteUser(user.email).subscribe(
          (response) => {
            console.log('User deleted successfully', response);
             this.user = undefined;
          },
          (error) => {
            console.error('Error deleting user', error);
          });
      }
    })
  }

  passwordDiversityValidator(password: string) {
    const longEnough = password.trim().length > 8;
    const hasDigit = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[@!#\$%\^&\*]/.test(password);

    if (!longEnough) { return 'ERR-LENGTH'; }
    else if (!hasDigit) { return 'ERR-DIGITS'; }
    else if (!hasUpperCase) { return 'ERR-UPPER_CASE'; }
    else if (!hasLowerCase) { return 'ERR-LOWER_CASE'; }
    else if (!hasSpecialChar) { return 'ERR-SPECIAL_CHARS'; }
    else { return 'GOOD'; }
  }

  updateAccount(): void {
    this.isFormValid = this.form.valid;

    const passwordReview = this.passwordDiversityValidator(this.form.value.password)
    if (passwordReview != "GOOD") {
      switch (passwordReview) {
        case 'ERR-LENGTH':
          alert('Password must be longer than 8 characters');
          return;
        case 'ERR-DIGITS':
          alert('Password must contain at least 1 digit');
          return;
        case 'ERR-UPPER_CASE':
          alert('Password must contain at least 1 uppercase letter');
          return;
        case 'ERR-LOWER_CASE':
          alert('Password must contain at least 1 lowercase letter');
          return;
        case 'ERR-SPECIAL_CHARS':
          alert('Password must contain at least 1 special character');
          return;
      }
    }

    if (this.isFormValid) {
      const updatedUser: User = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        phone: this.form.value.phone,
        address: this.form.value.address,
        email: this.user?.email || '',
        role:this.user?.role || Role.GUEST,
        isBlocked:false,
        isReported:false,
        ownerAnswerNotification: this.form.value.ownerAnswerNotification,
        gradedMyAccommodationNotification: this.form.value.gradedMyAccommodationNotification,
        gradedMeNotification: this.form.value.gradedMeNotification,
        resCanceledNotification:this.form.value.resCanceledNotification,
        resCreatedNotification:this.form.value.resCreatedNotification,
        status: UserStatus.APPROVED
      };
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.router.navigate(['/main'])
        },
        (error) => {
          console.error('Error updating user', error);
          if (error.error.errCode === "ERR-TOO_WEAK"){
            alert("Password you want to set is too weak!");
          }
          else {
            alert("Unkown error, check console for more details...")
          }
        }
      );
    }

  }

  protected readonly Role = Role;
}

