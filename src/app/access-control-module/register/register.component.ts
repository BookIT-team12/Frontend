import {Component} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Role, User, UserStatus} from "../../model/user.model";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  hide: boolean = true;
  hideConfirmation: boolean = true;

  constructor(private userService: UserService, private fb: FormBuilder, private router:Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      selectedRole:['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
    }, {validators: this.passwordMatchValidator});

  }
  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl(){
    return this.form.get('confirmPassword');

  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;  // Use the safe navigation operator '?'
    const confirmPassword = control.get('confirmPassword')?.value;  // Use the safe navigation operator '?'

    return password === confirmPassword ? null : { passwordMismatch: true };
  }



  onSubmit() {
    // Create a new User object
    console.log(this.form.value.password)
    console.log("za testiranje da vidim")

    if (this.form.valid) {
      let newUser: User;
      console.log("SELEKTOVANA: ", this.form.value.selectedRole)
      if ((this.form.value.selectedRole as Role) === Role.GUEST){
          newUser = new User(
            this.form.value.name,
            this.form.value.lastName,
            this.form.value.email,
            this.form.value.password,
            this.form.value.address,
            this.form.value.phone,
            this.form.value.selectedRole as Role,
            this.form.value.confirmPassword,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            UserStatus.PENDING
          );
      } else {  //it will be owner then
          newUser = new User(
            this.form.value.name,
            this.form.value.lastName,
            this.form.value.email,
            this.form.value.password,
            this.form.value.address,
            this.form.value.phone,
            this.form.value.selectedRole as Role,
            this.form.value.confirmPassword,
            false,
            false,
            true,
            true,
            true,
            true,
            false,
            UserStatus.PENDING
          );
      }
      console.log('User: ', newUser)

      this.userService.registerUser(newUser).subscribe(
        (result) => {
          // Handle success, if needed
          console.log('User registered successfully', result);
          this.router.navigate(['localhost:4200/main'])
        });
    } else {
      console.log("form errors:", this.form.errors)
      alert("Validation failed")
    }

  }

  protected readonly Role = Role;
}


