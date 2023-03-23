import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types/user';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
    private readonly users: IUser[] = [{id: 0, name: 'Bot', password: "123"}];

    getAllUsers(): IUser[] {
        return this.users
    }

    getUserById(getUserDto: GetUserDto): IUser {
        return this.users.find((user) => user.id === getUserDto.id)
    }

    createUser(createUserDto: CreateUserDto): IUser {
        const id = this.users.at(-1).id + 1 || 0;
        const newUser = {id, ...createUserDto}
        this.users.push(newUser)
        return newUser
    }

    deleteUsersById(deleteUserDto: DeleteUserDto): IUser {
        const userIndex = this.users.findIndex((user) => user.id === deleteUserDto.id)
        const user = this.users[userIndex]
        const delUser = this.users.splice(userIndex)
        return user
    }

    updateUserById(updateUserDto: UpdateUserDto): IUser {
        const userIndex = this.users.findIndex((user) => user.id === updateUserDto.id)
        const user:IUser = this.users[userIndex]
        const updatedUser:IUser = {id: user.id, name: updateUserDto.name || user.name, password: updateUserDto.password || user.password}
        this.users[userIndex] = updatedUser
        return updatedUser;
    }
    
}
