import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongoDbService } from './db/mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

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
  ],
})
export class UsersModule {}
