import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UserRole } from 'src/user/entities/user.entity';

export const User = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return String(request.user.userId);
});

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('JWT'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AdminOnlyAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('JWT'),
    SetMetadata(ROLES_KEY, UserRole.admin),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const ROLES_KEY = 'roles';
