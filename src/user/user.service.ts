import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/update-user-dto';
import { UserRO } from './user.ro';
import { AuthService } from 'src/auth/auth.service';
import { AuthRO } from 'src/auth/auth.ro';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private authService: AuthService,

    private readonly em: EntityManager,
  ) {}

  async validateUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOneOrFail({ id });

    return new UserRO(user);
  }

  async createUser(data: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (isUserExist?.email === data.email) {
      throw new BadRequestException('User email already exists');
    }
    if (isUserExist?.phone === data.phone) {
      throw new BadRequestException('User phone number already exists');
    }

    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: UserRole.normalUser,
      bio: data.bio,
      profileImage: data.profileImage,
    });

    this.em.persist(user);

    await this.em.flush();

    const jwtToken = this.authService.getJwtToken(user.id, user.email);

    return new AuthRO(jwtToken);
  }
}
