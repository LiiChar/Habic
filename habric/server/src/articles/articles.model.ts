import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: 'articles'})
export class Articles extends Model {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    author: string

    @Column({type: DataType.TEXT})
    text: string

    @Column({type: DataType.STRING})
    name: string

    @Column({type: DataType.INTEGER, defaultValue: 0})
    watcher: number

    @Column({type: DataType.STRING, allowNull: true})
    image: string

    @Column({type: DataType.TEXT})
    tags: string
}