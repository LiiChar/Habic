import { IUser } from 'src/types/user';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/signin-dto';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Get, Request, Headers } from '@nestjs/common';
import { Body, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/name')
    async getNameByToken(@Headers() header): Promise<string> {
        if (header.authorization) {
            return await this.authService.getNameByToket(header)
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() signInDto: SignInDto): Promise<IUser> {
        return this.authService.login(signInDto)
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('image'))
    async registration(@Body() userDto: CreateUserDto, @UploadedFile() image: Express.Multer.File): Promise<IUser> {
        return this.authService.registration(userDto, image)
    }
}
