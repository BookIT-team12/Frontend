export enum Role {
  ADMINISTRATOR = 'ADMINISTRATOR',
  GUEST = 'GUEST',
  OWNER= 'OWNER',
  UNKNOWN='UNKNOWN'
}
export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
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
  resCreatedNotification: boolean;
  resCanceledNotification: boolean;
  gradedMeNotification:boolean;
  gradedMyAccommodationNotification: boolean;
  ownerAnswerNotification:boolean;
  status: UserStatus;

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
    isBlocked:boolean,
    resCreatedNotification: boolean,
    resCanceledNotification: boolean,
    gradedMeNotification:boolean,
    gradedMyAccommodationNotification: boolean,
    ownerAnswerNotification:boolean,
    status: UserStatus
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
    this.resCreatedNotification = resCreatedNotification;
    this.resCanceledNotification = resCanceledNotification;
    this.gradedMeNotification = gradedMeNotification;
    this.gradedMyAccommodationNotification = gradedMyAccommodationNotification;
    this.ownerAnswerNotification = ownerAnswerNotification;
    this.status = status;
  }
}
