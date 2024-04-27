import { Controller, Get, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserRO } from './user.ro';
import { Auth } from '../common/decorators/user.decorator';
import { CreateUserDto } from './dto/update-user-dto';
import { AuthRO } from 'src/auth/auth.ro';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: AuthRO })
  @Auth()
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOkResponse({ type: UserRO })
  @Auth()
  @Get()
  getUser(@User() userId: number) {
    return this.userService.getUser(userId);
  }
}
