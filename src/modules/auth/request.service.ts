/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { MeData } from './types/auth';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(@Inject(REQUEST) private readonly request) {}

  getRequest(): Request {
    return this.request;
  }

  getToken(): string {
    return this.request.token;
  }

  getCurrentSessionData() {
    return this.request.me as MeData;
  }

  getCurrentUser() {
    return (this.request.me as MeData)?.user;
  }

  getCurrentUserId() {
    return (this.request.me as MeData)?.user?.id.toString();
  }
}
