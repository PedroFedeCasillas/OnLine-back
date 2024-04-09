import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
