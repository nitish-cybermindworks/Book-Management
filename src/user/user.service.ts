import { Injectable } from '@nestjs/common';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserRO } from './user.ro';
import { createPaginatedResponse } from '../utils';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async validateUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user;
  }

  // async updateProfileDetails(
  //   user: User,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UserRO> {
  //   wrap(user).assign(updateUserDto);

  //   await this.em.flush();

  //   return new UserRO(user);
  // }

  // async getUserList(
  //   user: User,
  //   pageNumber: number,
  //   pageSize: number,
  // ) {
  //   const options: FilterQuery<User> = { id: { $ne: user.id } };
  //   if (user.role === UserRole.normalUser) {
  //     options.profileVisibility = ProfileVisibilityEnum.public;
  //   }

  //   if (user.role === UserRole.admin && profileVisibility) {
  //     options.profileVisibility = profileVisibility;
  //   }

  //   const [userList, totalCount] = await this.userRepository.findAndCount(
  //     options,
  //     {
  //       limit: pageSize,
  //       offset: (pageNumber - 1) * pageSize,
  //     },
  //   );

  //   return createPaginatedResponse({
  //     results: userList.map((user) => new UserRO(user)),
  //     totalCount,
  //     pageNumber,
  //     pageSize,
  //   });
  // }
}
