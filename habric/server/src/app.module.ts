import { Users } from './users/users.model';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ConfigModule } from '@nestjs/config';
import { Comments } from './comments/comments.model';
import { Articles } from './articles/articles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule,
    CommentsModule,
    ArticlesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as Dialect,
      host: process.env.HOST,
      port: parseInt(process.env.PORT_DATABASE),
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [Users, Comments, Articles]
    }),
    AuthModule,
  ],
})
export class AppModule { }
