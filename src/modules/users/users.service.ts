import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@Inject() private usersRespository: UsersRepository) {}

  async getUsersAll() {
    return this.usersRespository.findAll();
  }

  async getUserById(id: number) {
    return this.usersRespository.findById(id);
  }
}
