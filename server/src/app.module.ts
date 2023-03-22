import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [UsersModule, CommentsModule, ArticlesModule],
})
export class AppModule {}
