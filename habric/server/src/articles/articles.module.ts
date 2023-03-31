import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.model';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [SequelizeModule.forFeature([Articles])]
})
export class ArticlesModule {}
