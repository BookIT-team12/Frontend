export enum Role {
  ADMINISTRATOR = 'ADMINISTRATOR',
  GUEST = 'GUEST',
  OWNER= 'OWNER',
  UNKNOWN='UNKNOWN'
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
  isReported:boolean;
  isBlocked:boolean;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    role: Role,
    confirm:string,
    isReported:boolean,
    isBlocked:boolean
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.role = role;
    this.confirmPassword=confirm;
    this.isReported=isReported;
    this.isBlocked=isBlocked;
  }
}
