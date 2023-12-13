export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER= 'OWNER'
}

export class User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: Role;
  confirmPassword:string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    role: Role,
    confirm:string,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.role = role;
    this.confirmPassword=confirm;
  }
}
