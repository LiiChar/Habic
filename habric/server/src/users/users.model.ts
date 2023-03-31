import { IUser } from './../types/user';
import { Column, DataType, Model, Table,  } from "sequelize-typescript";

@Table({tableName: 'users'})
export class Users extends Model<IUser>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}