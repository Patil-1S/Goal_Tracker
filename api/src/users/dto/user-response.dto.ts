import { User } from '../entities/user.entity';
export class UserResponseDto {
  id: string;
  name: string;
  mobile: string;
  gender: string;
  country: string;
  hobbies: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.mobile = user.mobile;
    this.gender = user.gender;
    this.country = user.country;
    this.hobbies = user.hobbies;
    this.email = user.email;
  }
}
