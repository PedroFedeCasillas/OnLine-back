import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongoDbService } from './db/mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, MongoDbService],
  imports: [
    MongooseModule.forFeature([
      {
       name: User.name,
       schema: UserSchema,
      },
    ]),
    //PostModule
  ],
})
export class UsersModule {}
