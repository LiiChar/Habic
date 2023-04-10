import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { FileModule } from 'src/file/file.module';


@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([Users]),
  ],
  exports: [UsersService]
})
export class UsersModule {}
