import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthSignInRequestArgs } from './types/auth.dto';
import { RequestService } from './request.service';
import { type IUserSessionService, MeData } from './types/auth';
import { USER_SESSION_SERVICE_TOKEN } from './consts';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SESSION_SERVICE_TOKEN)
    private readonly userSessionService: IUserSessionService,
    private readonly requestService: RequestService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(args: AuthSignInRequestArgs) {
    const user = await this.userSessionService.validateUser(args);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const { auth_token, sessionId } = await this.generateUserSession(
      String(user.id),
    );

    const session = await this.retriveSessionData(sessionId);

    return {
      auth_token,
      session,
    };
  }

  public me() {
    return this.requestService.getCurrentSessionData();
  }

  public async retriveSessionData(sessionId: string): Promise<MeData | null> {
    if (!sessionId) {
      return null;
    }

    const session = await this.userSessionService.retriveUserSession(sessionId);
    const userId = String(session?.usuario_id ?? '');

    if (!userId) {
      return null;
    }

    const user = await this.userSessionService.retriveUserProfile(userId);

    if (!user) {
      return null;
    }

    return {
      user,
    };
  }

  private async generateUserSession(userId: string) {
    if (!userId) {
      throw new Error('Dados inválidos para gerar a sessão de acesso');
    }

    const session = await this.userSessionService.createUserSession(userId);

    const sessionId = String(session?.id ?? '');

    if (!sessionId) {
      throw new Error('Dados inválidos para gerar a sessão de acesso');
    }

    try {
      return {
        sessionId: sessionId,
        auth_token: await this.jwtService.signAsync(sessionId),
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          'Não foi possível gerar a sessão de acesso. Detalhe: ' + err.message,
        );
      } else {
        throw new Error('Não foi possível gerar a sessão de acesso.');
      }
    }
  }
}
