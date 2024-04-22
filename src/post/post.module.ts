import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './db/mongodb.service';
import { Posts, PostSchema } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { 
          name: Posts.name, 
          schema: PostSchema 
        }
      ]),
      UsersModule
  ],
  controllers: [PostController],
  providers: [PostService, MongoDbService],
  exports: [MongooseModule, PostService],
})
export class PostModule {}
