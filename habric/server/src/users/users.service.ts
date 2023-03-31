import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types/user';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users) private usersModel: typeof Users) {}

    getAllUsers(): Promise<IUser[]> {
        return this.usersModel.findAll()
    }

    getUserById(getUserDto: GetUserDto): Promise<IUser> {
        const id = getUserDto.id
        return this.usersModel.findOne({
            where: {
                id
            }
        })
    }

    getUserByUsername(username: string): Promise<IUser> {
        return this.usersModel.findOne({
            where: {
                username
            }
        })
    }

    createUser(createUserDto: CreateUserDto): Promise<IUser> {
        return this.usersModel.create(createUserDto)
    }

    async deleteUsersById(deleteUserDto: DeleteUserDto): Promise<IUser> {
        const id = deleteUserDto.id
        const delUser = await this.usersModel.findOne({
            where: {
                id
            }
        })
        await this.usersModel.destroy({
            where: {
                id
            }
        })
        return delUser
    }

    updateUserById(updateUserDto: UpdateUserDto): Promise<IUser> {
        const id = updateUserDto.id
        this.usersModel.update(
            updateUserDto,
            {
                where: {
                    id
                }
            }
        )
        return this.usersModel.findOne({
            where: {
                id
            }
        });
    }
    
}
