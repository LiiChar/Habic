import { IComment } from './../types/comment';
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: 'comments'})
export class Comments extends Model<IComment>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    author: string;

    @Column({type: DataType.INTEGER})
    to: number;

    @Column({type: DataType.TEXT})
    text: string;
    
}