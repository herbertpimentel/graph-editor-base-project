export interface User {
  id: number;
  username: string;
}

export interface UserSession {
  id: number;
  usuario_id: number;
}

export interface MeData {
  user: User;
}

export interface IUserSessionService {
  validateUser(args: any): Promise<User | null>;

  retriveUserProfile(userId: string): Promise<User | null>;

  createUserSession(userId: string): Promise<UserSession | null>;

  retriveUserSession(sessionId: string): Promise<UserSession | null>;
}
