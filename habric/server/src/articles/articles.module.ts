import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.model';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    SequelizeModule.forFeature([Articles]),
    FileModule
  ]
})
export class ArticlesModule {}
