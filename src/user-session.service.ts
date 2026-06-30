import { Injectable } from '@nestjs/common';

import {
  IUserSessionService,
  User,
  UserSession,
} from './modules/auth/types/auth';

@Injectable()
export class UserSessionService implements IUserSessionService {
  private sessions: UserSession[] = [];

  constructor() {}

  public async validateUser(args: any): Promise<User | null> {
    console.log('validateUser', args);
    return Promise.resolve({ id: 1, username: 'herbertpimentel' });
  }

  public async retriveUserProfile(userId: string): Promise<User | null> {
    console.log('retriveUserProfile', userId);
    return Promise.resolve({ id: 1, username: 'herbertpimentel' });
  }

  public async createUserSession(userId: string): Promise<UserSession | null> {
    console.log('createUserSession', userId);

    const session = { id: 1, usuario_id: +userId };
    this.sessions.push(session);
    return Promise.resolve(session);
  }

  public async retriveUserSession(
    sessionId: string,
  ): Promise<UserSession | null> {
    console.log('retriveSessionById', sessionId);
    const us = this.sessions.find(
      (s: UserSession) => String(s.id) === sessionId,
    );
    return Promise.resolve(us ?? null);
  }
}
