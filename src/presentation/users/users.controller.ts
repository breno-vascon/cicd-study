import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import type { ICreateUserUsecase } from '../../domain/usecases/create-user/create-user.types';
import { ICreateUserUsecaseSymbol } from '../../domain/usecases/create-user/create-user.types';
import type { IFindUsersUsecase } from '../../domain/usecases/find-users/find-users.types';
import { IFindUsersUsecaseSymbol } from '../../domain/usecases/find-users/find-users.types';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(ICreateUserUsecaseSymbol)
    private readonly createUserUsecase: ICreateUserUsecase,
    @Inject(IFindUsersUsecaseSymbol)
    private readonly findUsersUsecase: IFindUsersUsecase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUsecase.execute(dto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.findUsersUsecase.execute();
  }
}
