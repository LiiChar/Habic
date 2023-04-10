import { FileService } from './../file/file.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { SignInDto } from './dto/signin-dto';
import { UsersService } from './../users/users.service';
import { IUser } from 'src/types/user';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor ( 
        private usersService: UsersService, 
        private jwtService: JwtService,
        private fileService: FileService
    ) {}

    async getNameByToket(headers): Promise<any> {
        
        const [type, tokenType] = headers.authorization?.split(' ') ?? [];
        const token = type === 'Bearer' ? tokenType : undefined;
        if (type) {
            const {id, username, password} = await this.jwtService.verifyAsync(type, {
                secret: process.env.SECRET_KEY
            })
            return this.usersService.getNameByToket(id)
        }
    }
    
    async login(signInDto: SignInDto): Promise<any> {
        const user: IUser = await this.usersService.getUserByUsername(signInDto.username);
        if (user) {
            const passwordEquals = await bcrypt.compareSync(signInDto.password, user.password)
            if (user && passwordEquals) {
                const payload = {id: user.id, username: user.username, password: user.password};
                return await this.jwtService.signAsync(payload)
            } else {
                throw new UnauthorizedException({message: 'Неправильный логин или пароль'});
            }
        }  else {
            throw new UnauthorizedException({message: 'Неправильный логин или пароль'});
        }
    }   

    async registration(registrationDto: CreateUserDto, avatar): Promise<any> {
        const createImage = this.fileService.createImage(avatar)
        
        const user: IUser = await this.usersService.getUserByUsername(registrationDto.username);

        if (user) {
            throw new HttpException('Такой пользователь уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(registrationDto.password, 5);

        const newUser = await this.usersService.createUser({...registrationDto, password: hashPassword, image: createImage});

        const payload = {id: newUser.id, username: newUser.username, password: newUser.password};
        return await this.jwtService.signAsync(payload)
    }
}
