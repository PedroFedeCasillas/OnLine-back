import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongoDbService } from './db/mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PostModule } from 'src/posts/post.module';

@Module({

  imports: [
    MongooseModule.forFeature([
      {
       name: User.name,
       schema: UserSchema,
      },
    ]),
    forwardRef(() => PostModule),
  ],
  controllers: [UsersController],
  providers: [UserService, MongoDbService],
  exports: [MongooseModule, UserService],
})
export class UsersModule {}
