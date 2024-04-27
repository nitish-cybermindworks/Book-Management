import { User, UserRole } from './entities/user.entity';

export class UserRO {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  role: UserRole;
  profileImage: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.fullName;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.bio = user.bio;
    this.profileImage = user.profileImage;
  }
}
