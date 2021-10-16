import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): User[] {
    const user = this.usersService.findAll(name);

    if (user.length === 0) {
      throw new NotFoundException()
    }

    return user;
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);

    console.log(typeof id);
    

    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  @ApiCreatedResponse({type: User})
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDTO): User {
    return this.usersService.createUser(body)
  }
}
