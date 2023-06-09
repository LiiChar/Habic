import { GetUserIdDto } from './dto/get-userId.dto';
import { AuthGuard } from './../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body, Delete, Put, UseGuards, Res, Headers, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IUser } from 'src/types/user';

import { FileInterceptor } from '@nestjs/platform-express'

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

    @Get('name/:username')
    async getUserByName(@Param() getUserIdDto: GetUserIdDto ): Promise<IUser> {
        return await this.usersService.getUserByUsername(getUserIdDto.username)
    }

    @Get('image/:username')
    async getImageByName(@Param() getImageIdDto: GetUserIdDto): Promise<string> {
        return await this.usersService.getImageByName(getImageIdDto.username)
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
        return await this.usersService.createUser(createUserDto)
    }
    
    @Delete()
    async deleteUser(@Body() deleteUserDto: DeleteUserDto): Promise<IUser> {
        return await this.usersService.deleteUsersById(deleteUserDto)
    }

    @UseGuards(AuthGuard)
    @Put()
    async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<IUser> {
        return await this.usersService.updateUserById(updateUserDto)
    }
}
