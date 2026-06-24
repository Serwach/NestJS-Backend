import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: (err: any, id: number) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: (err: any, user: User | null) => void) {
    const user = await this.usersRepository.findOneBy({ id });
    done(null, user);
  }
}
