import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
