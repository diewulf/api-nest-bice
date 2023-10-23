import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtGuard } from '../../shared/application/auth-jwt.guard';

export const CustomController = (options: {
  tags: string[];
  security: boolean;
  useAuthGuard: boolean;
}) => {
  const decorators = [ApiTags(...options.tags)];

  if (options.security) {
    decorators.push(ApiSecurity('X-API-KEY'), ApiBearerAuth());
  }

  if (options.useAuthGuard) {
    decorators.push(UseGuards(AuthJwtGuard));
  }

  return applyDecorators(...decorators);
};