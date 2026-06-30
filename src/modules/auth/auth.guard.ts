import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IS_PUBLIC_KEY } from './public.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // TODO: remove it
    return true;

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request?.token) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
