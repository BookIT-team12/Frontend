export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: Role;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    role: Role
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.role = role;
  }
}
