import { Controller, Get, Body, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRO } from './user.ro';
import { Auth, getUserFromToken } from '../common/decorators/user.decorator';
import { User, UserRole } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // User can update profile visibility as well as other details
  // @Auth()
  // @ApiOkResponse({ type: UserRO })
  // @Put()
  // async updateProfileDetails(
  //   @getUserFromToken() user: User,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return await this.userService.updateProfileDetails(user, updateUserDto);
  // }

  // User can get  profile of other user based on his role and admin can use profileVisibility filter option
  // @Auth()
  // @Get('list')
  // async getUserList(
  //   @getUserFromToken() user: User,
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  //   @Query('profileVisibility') profileVisibility?: ProfileVisibilityEnum,
  // ) {
  //   return await this.userService.getUserList(
  //     user,
  //     pageNumber,
  //     pageSize,
  //     profileVisibility,
  //   );
  // }
}
