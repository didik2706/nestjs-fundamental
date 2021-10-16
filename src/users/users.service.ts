import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, name: 'Marius' },{ id: 2, name: 'Didik' },{ id: 3, name: 'Hafidz' }];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter(user => user.name === name)
    }
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find(user => user.id === userId)
  }

  createUser(createUserDTO: CreateUserDTO): User {
    const newUser = { id: Date.now(), ...createUserDTO }

    this.users.push(newUser);

    return newUser;
  }
}
