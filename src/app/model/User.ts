// user.model.ts

export class User {
  // Define properties of the User model
  public name: string;
  public email: string;
  public surname: string;
  public oldPassword: string;
  public newPassword: string;
  public phone: string;
  public address: string;
  public profilePicture: File | null;

  constructor(
    name: string,
    email: string,
    surname: string,
    oldPassword: string,
    newPassword: string,
    phone: string,
    address: string,
    profilePicture: File | null
  ) {
    this.name = name;
    this.email = email;
    this.surname = surname;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.phone = phone;
    this.address = address;
    this.profilePicture = profilePicture;
  }
}
