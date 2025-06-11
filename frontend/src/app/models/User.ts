import { Role } from './Role';

export class User {
  userId: number =0;
  phoneNumber: string ='';
  username: string ='';
  password: string ='';
  email: string ='';
  firstName: string ='';
  lastName: string ='';
  role: Role = Role.ADMIN;
}
