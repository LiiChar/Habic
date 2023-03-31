import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { IUser } from 'src/types/user';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get()
    async getAllUser(): Promise<IUser[]> {
        return await this.usersService.getAllUsers()
    }

    @Get(':id')
    async getUser(@Body() getUserDto: GetUserDto): Promise<IUser> {
        return await this.usersService.getUserById(getUserDto)
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
        return await this.usersService.createUser(createUserDto)
    }

    @Delete()
    async deleteUser(@Body() deleteUserDto: DeleteUserDto): Promise<IUser> {
        return await this.usersService.deleteUsersById(deleteUserDto)
    }

    @Put()
    async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<IUser> {
        return await this.usersService.updateUserById(updateUserDto)
    }
}
