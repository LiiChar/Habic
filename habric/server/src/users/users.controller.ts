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
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    async getUser(@Body() getUserDto: GetUserDto): Promise<IUser> {
        return this.usersService.getUserById(getUserDto)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): IUser {
        return this.usersService.createUser(createUserDto)
    }

    @Delete()
    deleteUser(@Body() deleteUserDto: DeleteUserDto): IUser {
        return this.usersService.deleteUsersById(deleteUserDto)
    }

    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto): IUser {
        return this.usersService.updateUserById(updateUserDto)
    }
}
