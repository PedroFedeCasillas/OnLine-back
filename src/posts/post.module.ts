import { forwardRef, Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './db/mongodb.service';
import { Posts, PostSchema } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { 
          name: Posts.name, 
          schema: PostSchema 
        }
      ]),
      forwardRef(() => UsersModule),
      CloudinaryModule,
  ],
  controllers: [PostController],
  providers: [PostService, MongoDbService],
  exports: [MongooseModule, PostService],
})
export class PostModule {}
