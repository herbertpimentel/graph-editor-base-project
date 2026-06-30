import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';

import { jwtConstants } from './auth.constants';
import { AuthService } from './auth.service';

@Injectable()
export class UserIdentificationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jwtToken = this.extractTokenFromHeader(req);

    if (jwtToken) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const decodedJwt = await this.jwtService.verifyAsync(jwtToken, {
          secret: jwtConstants.secret,
        });

        if (!decodedJwt) {
          throw new UnauthorizedException('Token jwt inválido');
        }

        const sessionId = String(decodedJwt);

        const me = await this.authService.retriveSessionData(sessionId);

        if (!me) {
          throw new UnauthorizedException();
        }

        req['token'] = sessionId;
        req['me'] = me;
      } catch (err) {
        console.error(err);
        throw new UnauthorizedException();
      }
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
